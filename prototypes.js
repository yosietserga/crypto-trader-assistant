'use strict';

String.prototype.find = function(chr) {
    return this.indexOf(chr) === -1 ? false : true;
};

Number.prototype.countDecimals = function() {
    if (Math.floor(this.valueOf()) === this.valueOf() || isInt(this.valueOf())) return 0;
    return this.toString().split(".")[1].length || 0;
};

Number.prototype.toFix = function(n) {
    return parseFloat(this.toString().substring(0, (this.toString().indexOf(".") + n)));
};

Array.prototype.unique = function() {
    return this.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
};