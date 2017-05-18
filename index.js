let decodeHex = (s) => { 
    let res = [];
    while(s.length >= 2) {
        res.push(parseInt(s.substring(0,2), 16)|0);
        s = s.substring(2, s.length);
    }
    return res;
}

let encodeHex = (a) => {
    let res = '';
    a.forEach((i) => {
        res += i.toString(16);
    });
    return res;
}

let decodeBase64 = (s) => {
    var b = new Buffer(s, 'base64');
    return decodeHex(b.toString('hex'));
}

let encodeBase64 = (a) => {
    var b = new Buffer(a);
    return b.toString('base64');
}

let fixedLengthXor = (a1, a2) => {
    if(a1.length !== a2.length) throw 'Arrays not equal size';
    let a3 = [];
    for(let i = 0; i < a1.length; ++i) {
        a3[i] = a1[i] ^ a2[i];
    }
    return a3;
}

let s1 = '1c0111001f010100061a024b53535009181c';
let s2 = '686974207468652062756c6c277320657965';

let a1 = decodeHex(s1);
let a2 = decodeHex(s2);
let a3 = fixedLengthXor(a1, a2);
console.log(encodeHex(a3));