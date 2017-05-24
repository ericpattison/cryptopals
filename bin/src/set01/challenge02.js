"use strict";
var crypt_1 = require("../crypt");
var enc_1 = require("../enc");
console.log(enc_1.encodeHex(crypt_1.xor(enc_1.decodeHex('1c0111001f010100061a024b53535009181c'), enc_1.decodeHex('686974207468652062756c6c277320657965'))));
