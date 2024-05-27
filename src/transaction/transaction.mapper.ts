import {TransactionEntity} from "./transaction.entity";
import {TransactionDto} from "./transaction.dto";

export const TransactionEntityToDto = (entity: TransactionEntity): TransactionDto => {
    const {id, createdAt, nftId} = entity;
    return new TransactionDto(id, createdAt, nftId);
}