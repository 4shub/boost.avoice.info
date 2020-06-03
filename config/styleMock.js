var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function () {
    if (arguments[0].includes('.scss')) {
        return null;
    }

    //do your thing here
    return originalRequire.apply(this, arguments);
};
