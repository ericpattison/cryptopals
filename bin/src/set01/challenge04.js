"use strict";
var enc_1 = require("../enc");
var crypt_1 = require("../crypt");
var s1c4_1 = require("../../data/s1c4");
var results = [];
for (var i = 0; i < s1c4_1.default.length; ++i) {
    var item = enc_1.decodeHex(s1c4_1.default[i]);
    for (var j = 0; j < 256; ++j) {
        var msg = enc_1.encodeAscii(crypt_1.xor(j, item));
        results.push({
            key: i,
            message: msg,
            score: crypt_1.score(msg)
        });
    }
}
results.sort(function (a, b) { return b.score - a.score; });
console.log(results[0]);
