"use strict";
var crypt_1 = require("./crypt");
exports.hammingDistance = function (a, b) {
    var data = crypt_1.xor(a, b);
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < 8; ++j) {
            total += data[i] & 1;
            data[i] >>= 1;
        }
    }
    return total;
};
