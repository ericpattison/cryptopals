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
    let top6expected = ' ETAOI', bottom6expected = 'VKJXQZ';
    let charMap = {' ':0, 'A':0,'B':0, 'C':0, 'D':0, 'E':0, 'F':0, 'G':0, 'H':0, 'I':0, 'J':0, 'K':0, 'L':0, 'M':0, 'N':0, 'O':0, 'P':0, 'Q':0, 'S':0, 'T':0, 'U':0, 'V':0, 'W':0, 'X':0, 'Y':0, 'Z':0};
    s = s.toUpperCase();

    for(let i = 0; i < s.length; ++i) {
        if(charMap[s[i]] >= 0) {
            charMap[s[i]] ++;
        }
    }

    let list = [];
    for(var k in charMap) { list.push([k, charMap[k]]); }
    
    let sorted = list.sort((a,b) => { return b[1] - a[1]; });

    let str = '';
    sorted.forEach( (i) => { str += i[0]} );

    let top6 = str.substr(0, 6);
    let bottom6 = str.substr(str.length-7, 6);

    let count = (s1, s2) => {
        let c = 0;
        for(let i = 0; i < s1.length; ++i) {
            for(let j = i; j < s2.length; ++j) {
                if(s1[i] == s2[j]) c++;
            }
        }
        return c;
    }
    
    return count(top6, top6expected) + count(bottom6, bottom6expected);
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