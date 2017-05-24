import {decodeAscii, encodeHex} from '../enc';
import {xor} from '../crypt';

const testData = decodeAscii("Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal");
const key = decodeAscii('ICE');

console.log(
    encodeHex(
        xor(key, testData)
    )
)