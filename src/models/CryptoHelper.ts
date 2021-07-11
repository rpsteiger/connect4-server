export interface CryptoHelper {
    randomHash(): string
}

export class MyCryptoHelper implements CryptoHelper {
    randomHash(): string {
        throw new Error('Method not implemented.')
    }
}
