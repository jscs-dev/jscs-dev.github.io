require('babel/register')({
    extensions: ['.jsx']
});

require.extensions['.styl'] = function(/* m, filename */) {
    return '';
};
