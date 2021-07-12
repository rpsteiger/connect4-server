import sjcl from 'sjcl'

export interface CryptoHelper {
    randomHash(): string
}

export class MyCryptoHelper implements CryptoHelper {
    randomHash(): string {
        const randomByte = sjcl.random.randomWords(1)
        const sha256 = new sjcl.hash.sha256()
        sha256.update(randomByte)
        const hash = sha256.finalize()
        return sjcl.codec.hex.fromBits(hash)
    }
}
