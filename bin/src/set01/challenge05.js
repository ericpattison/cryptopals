"use strict";
var enc_1 = require("../enc");
var crypt_1 = require("../crypt");
var testData = enc_1.decodeAscii("Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal");
var key = enc_1.decodeAscii('ICE');
console.log(enc_1.encodeHex(crypt_1.xor(key, testData)));
