import {xor} from '../crypt';
import {decodeHex, encodeHex} from '../enc';

console.log(
    encodeHex(
        xor(
            decodeHex('1c0111001f010100061a024b53535009181c'),
            decodeHex('686974207468652062756c6c277320657965')
        )
    )
);