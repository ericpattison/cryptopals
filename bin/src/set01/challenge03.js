"use strict";
var enc_1 = require("../enc");
var crypt_1 = require("../crypt");
var test = enc_1.decodeHex('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
var results = [];
for (var i = 0; i < 256; ++i) {
    var msg = enc_1.encodeAscii(crypt_1.xor(i, test));
    results.push({
        key: i,
        score: crypt_1.score(msg),
        message: msg
    });
}
results.sort(function (a, b) { return b.score - a.score; });
console.log(results[0]);
