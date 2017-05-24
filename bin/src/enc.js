"use strict";
exports.encodeHex = function (a) {
    var res = '';
    a.forEach(function (i) {
        res += ('0' + i.toString(16)).substr(-2, 2);
    });
    return res;
};
exports.decodeHex = function (s) {
    var res = [];
    while (s.length >= 2) {
        res.push(parseInt(s.substring(0, 2), 16) | 0);
        s = s.substring(2, s.length);
    }
    return res;
};
exports.encodeBase64 = function (a) { return new Buffer(a).toString('base64'); };
exports.decodeBase64 = function (s) { return exports.decodeHex(new Buffer(s, 'base64').toString('hex')); };
exports.encodeAscii = function (a) { return (new Buffer(a)).toString(); };
exports.decodeAscii = function (s) { return exports.decodeBase64(new Buffer(s).toString('base64')); };
