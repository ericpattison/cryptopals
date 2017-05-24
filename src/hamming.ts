import { xor } from './crypt';

export const hammingDistance = (a,b) => {
    let data = xor(a,b);
    let total = 0;
    for(let i = 0; i < data.length; ++i) {
        for(let j = 0; j < 8; ++j) {
            total += data[i] & 1;
            data[i] >>= 1;
        }
    }
    return total;
}