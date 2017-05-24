import {decodeHex, encodeAscii} from '../enc';
import {xor, score} from '../crypt'

import data from '../../data/s1c4';

let results = [];
for(let i = 0; i < data.length; ++i) {
    let item = decodeHex(data[i]);
    for(let j = 0; j < 256; ++j) {
        let msg = encodeAscii(xor(j, item));
        results.push({
            key: i,
            message: msg,
            score: score(msg)
        })
    }
}

results.sort((a,b) => {return b.score - a.score;});

console.log(results[0]);