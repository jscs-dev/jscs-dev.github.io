var gulp = require('gulp');
var shell = require('gulp-shell');
var markdownPage = require('./tools/markdown-page');
var teamPage = require('./tools/team-page');
var rulesPage = require('./tools/rules-page');
var addJsDoc = require('./tools/add-jsdoc');

gulp.task('build', ['about', 'overview', 'contributing', 'rules', 'team', 'demo']);

gulp.task('about', function() {
    return gulp.src('jscs/README.md')
        .pipe(markdownPage('src/about.jade', 'index.html', {title: 'About'}))
        .pipe(gulp.dest('result'));
});

gulp.task('overview', function() {
    return gulp.src('jscs/OVERVIEW.md')
        .pipe(markdownPage('src/overview.jade', 'overview.html', {title: 'Overview'}))
        .pipe(gulp.dest('result'));
});

gulp.task('contributing', function() {
    return gulp.src('jscs/CONTRIBUTING.md')
        .pipe(markdownPage('src/contributing.jade', 'contributing.html', {title: 'Contributing'}))
        .pipe(gulp.dest('result'));
});

gulp.task('team', function() {
    return gulp.src('jscs/package.json')
        .pipe(teamPage('src/team.jade', 'team.html', {title: 'Team'}))
        .pipe(gulp.dest('result'));
});

gulp.task('rules', function() {
    return gulp.src('jscs/lib/rules/*.js')
        .pipe(rulesPage('src/rules.jade', 'rules.html', {title: 'Rules'}))
        .pipe(gulp.dest('result'));
});

gulp.task('demo', function() {
    return gulp.src('')
        .pipe(markdownPage('src/demo.jade', 'demo.html', {title: 'Demo'}))
        .pipe(gulp.dest('result'));
});

gulp.task('add-jsdoc', function() {
    return gulp.src('jscs/lib/rules/*.js')
        .pipe(addJsDoc('jscs/README.md'))
        .pipe(gulp.dest('rules'));
});

gulp.task('checkout', shell.task([
    'if [ -d jscs ]; then cd jscs && git fetch origin;' +
    'else git clone git@github.com:jscs-dev/node-jscs.git jscs; fi',
    'cd jscs;' +
    'LAST_TAG_REV=`git rev-list --tags --max-count=1`;' +
    'LAST_TAG=`git describe --tags "$LAST_TAG_REV"`;' +
    'git checkout "$LAST_TAG";' +
    'if [ ! -f OVERVIEW.md ]; then git checkout master && git pull; fi',
    'cd jscs; npm install; npm run browserify;',
    'cp jscs/jscs-browser.js result/assets/jscs-browser.js'
]));

gulp.task('publish', ['build'], shell.task([
    'if [ -d publish ]; then rm -Rf ./publish; fi',
    'git clone git@github.com:jscs-dev/jscs-dev.github.io.git ./publish',
    'cd publish; git checkout master;',
    'cd publish; ls -a1 | grep -v "^.git$" | grep -v "^.$" | grep -v "^..$" | xargs rm -Rf',
    'cp -R result/* publish',
    'cd publish; git add -A;' +
    'git commit -m "Website update";' +
    'git push origin master',
    'echo; echo "Website was published at http://jscs.info/"'
]));

gulp.task('watch', ['build'], function() {
    gulp.watch(['src/**', 'jscs/README.md'], ['about']);
    gulp.watch(['src/**', 'jscs/OVERVIEW.md'], ['overview']);
    gulp.watch(['src/**', 'jscs/CONTRIBUTING.md'], ['contributing']);
    gulp.watch(['src/**', 'jscs/package.json'], ['team']);
    gulp.watch(['src/**', 'jscs/lib/rules/*.js'], ['rules']);
    gulp.watch(['src/**'], ['demo']);
});
