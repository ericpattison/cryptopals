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

let decodeAscii = (s) => {
    let b = new Buffer(s);
    return decodeHex(b.toString('hex'));
}

let encodeAscii = (a) => {
    return new Buffer(a).toString();
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

let hammingDistance = (a,b) => {
    let c = xor(a,b);
    let d = 0;
    for(let i = c.length-1; i >= 0; --i) {
        let e = c[i];
        for(let j = 0; j < 8; j++) {
            d += e & 0x1
            e >>= 1;
        }
    }
    return d;
}

let hammingDistances = (a,b,c) => {
    let r = [];
    for(let i = a; i <= b; ++i) {
        let c1 = c.slice(0, i);
        let c2 = c.slice(i, i*2);
        let c3 = c.slice(i*2, i*3);
        let c4 = c.slice(i*3, i*4);
        
        let d = (hammingDistance(c1,c2) + hammingDistance(c3,c4)) / 2;

        r.push({distance: d, length: i, normalizedDistance: d/(i*8)});
    }
    r.sort((d1,d2) => {return d1.normalizedDistance - d2.normalizedDistance});
    return r;
}

let buildBlocks = (d, s) => {
    let r = [];
    for(let i = 0; i < d.length; i+=s) {
        r.push(d.slice(i,i+s));
    }
    return r;
}

let transposeBlocks = (d) => {
    let r = [];
    for(let i = 0; i < d[0].length; ++i) {
        let r1 = [];
        for(let j = 0; j < d.length; ++j) {
            r1.push(d[j][i]);
        }
        r.push(r1);
    }
    return r;
}

let scoreBlock = (b) => {
    let scores = [];
    for(let i = 0; i < 256; ++i) {
        let x = xor(i, b);
        let m = new Buffer(x).toString();
        let s = score(m);
        scores.push( {key: i, score: s, message: m} );
    }
    scores.sort((s1, s2) => { return s2.score - s1.score; });
    return scores;
}
/*
let message = decodeAscii('Hello World');
let key = decodeAscii('abc');
let cypher = xor(key, message);

console.log(cypher);
console.log(encodeBase64(cypher));
console.log(decodeBase64(encodeBase64(cypher)));

let keyLengths = hammingDistances(1,5, cypher);
console.log(keyLengths.sort((k1, k2) => { return k1.length - k2.length; }));
*/


let testData = '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';
let bytes = decodeBase64(testData);

let keylenTest = hammingDistances(2, 40, bytes);
//console.log(keylenTest.filter( (k) => { return k.length == 29; } ));
console.log(keylenTest);

let results = [];
for(let i = 0; i < keylenTest.length; ++i) {
    let blocks = buildBlocks(bytes, keylenTest[i].length);
    let tblocks = transposeBlocks(blocks);
    
    let blockScores = [];
    for(let i = 0; i < tblocks.length; ++i) {
        blockScores.push( scoreBlock(tblocks[i]) );
    }

    for(let i = 0; i < tblocks.length; ++i) {
        let key = [];
        blockScores.forEach((blockScore) => {
            key.push(blockScore[i].key);
        });

        let xored = xor(key, bytes);
        let message = (new Buffer(xored)).toString();
        let scored = score(message);
        let res = {key: (new Buffer(key).toString()), score: scored, message: message};
        results.push(res);
    }

    let testKey = [];
    blockScores.forEach((score) => {
        console.log(score);
        testKey.push(score.key);
    });
    //console.log(testKey);
}

results.sort((a,b) => {return b.score - a.score});
console.log(results);
