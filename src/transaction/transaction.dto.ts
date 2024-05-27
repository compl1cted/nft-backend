export class CreateTransactionDto {
    nftId: string;
}

export class TransactionDto {
    id: string;
    createdAt: Date;
    nftId: string;

    constructor(id: string, createdAt: Date, nftId: string) {
        this.id = id;
        this.createdAt = createdAt;
        this.nftId = nftId;
    }
}