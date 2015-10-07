var shelljs = require('shelljs');
var isWin = ('win32' === require('os').platform());

if (isWin) {
    /**
     * Copies the file on windows, instead of trying to create symlink, to avoid various difficulties.
     * Preserves the signature of shelljs.ln, i.e. with -f option it will pass the force option to shelljs.cp
     * @returns {*}
     */
    module.exports = function cpInsteadOfLnOnWindows() {
        var args = [];
        if (arguments.length === 3) {
            if (arguments[0].toLowerCase().indexOf('f') > -1) {
                args.push('-f');
            }
            args = args.concat( Array.prototype.slice.call(arguments, 1) );
        }
        else {
            args = Array.prototype.slice.call(arguments);
        }
        return shelljs.cp.apply(shelljs, args);
    }
}
else { // regular "create symlink" operation
    module.exports = shelljs.ln;
}