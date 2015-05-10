#!/bin/sh

if [ -d publish ]; then
    rm -Rf ./publish;
fi

git clone git@github.com:jscs-dev/jscs-dev.github.io.git ./publish

cd publish

git checkout master;

ls -a1 | grep -v "^.git$" | grep -v "^.$" | grep -v "^..$" | xargs rm -Rf

cp -R ../result/* .

git add -A
git commit -m "Website update"
git push origin master

echo;

echo "Website was published at http://jscs.info/";
