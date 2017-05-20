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

let xor = (k, a) => {
    let res = [];
    if (Array.isArray(k) === false) k = [k];
    for(let i = 0, j = 0; i < a.length; ++i, j = (j + 1) % k.length) {
        res[i] = a[i] ^ k[j];
    }
    return res;
}

let score = (s) => {
    const frequencies={'A':0.0651738,'B':0.0124248,'C':0.0217339,'D':0.0349835,'E':0.1041442,'F':0.0197881,'G':0.0158610,'H':0.0492888,'I':0.0558094,'J':0.0009033,'K':0.0050529,'L':0.0331490,'M':0.0202124,'N':0.0564513,'O':0.0596302,'P':0.0137645,'Q':0.0008606,'R':0.0497563,'S':0.0515760,'T':0.0729357,'U':0.0225134,'V':0.0082903,'W':0.0171272,'X':0.0013692,'Y':0.0145984,'Z':0.0007836,' ':0.1918182}
    s = s.toUpperCase();
    let score = 0;
    for(let i = 0; i < s.length; ++i) {
        if(s[i] in frequencies) {
            score += frequencies[s[i]];
        }
    }
    return score;
}

const filename = '4.txt';
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(filename)
});

let lineIndex = 0;
let data = [];

lineReader.on('line', (line) => {
    lineIndex++;
    let decoded = decodeHex(line);
    for(let i = 0; i < 256; ++i) {
        let xord = xor(i, decoded);
        let message = new Buffer(xord).toString();
        let sc = score(message);

        data.push({
            line: lineIndex,
            key: i,
            message: message,
            score: sc
        });
    }
    //console.log(line);
}).on('close', () => {
    /*for(let i = 0; i < 10; ++i) {
        console.log(data[i]);
    }*/

    data.sort((a,b) => {
        return b.score - a.score;
    });

    data.forEach((i) => { console.log(i.score + ', ' + i.line + ', ' + i.key + ' => ' + i.message)});

    /*for(let i = 0; i < 10; ++i) {
        console.log(data[i]);
    }*/
});