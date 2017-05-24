import {decodeHex, encodeAscii} from '../enc';
import {xor, score} from '../crypt';

const test = decodeHex('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');

let results = [];
for(let i = 0; i < 256; ++i) {
    let msg = encodeAscii(xor(i, test))
    results.push({
        key: i,
        score: score(msg),
        message: msg
    });
}

results.sort((a,b) => { return b.score - a.score; });

console.log(results[0]);