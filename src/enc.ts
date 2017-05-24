export const encodeHex = (a) => {
    let res = '';
    a.forEach((i) => {
        res += ('0' + i.toString(16)).substr(-2,2);
    });
    return res;
}

export const decodeHex = (s) => { 
    let res = [];
    while(s.length >= 2) {
        res.push(parseInt(s.substring(0,2), 16) | 0);
        s = s.substring(2, s.length);
    }
    return res;
 }

export const encodeBase64 = (a) => { return new Buffer(a).toString('base64'); }

export const decodeBase64 = (s) => { return decodeHex(new Buffer(s, 'base64').toString('hex')); }

export const encodeAscii = (a) => { return (new Buffer(a)).toString(); }

export const decodeAscii = (s) => { return decodeBase64(new Buffer(s).toString('base64')); }