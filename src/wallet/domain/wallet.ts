/**
 * Wallet 
    id: Primary Key (auto-increment or UUID)
    user_id: Foreign Key (references the Users table)
    tag: String (optional, for labeling wallets)
    chain: String (required, identifies the blockchain, e.g., Ethereum, Bitcoin)
    address: String (required, unique)
 */

export class Wallet {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly tag: string | null,
        public readonly chain: string,
        public readonly address: string,
    ) { }
}