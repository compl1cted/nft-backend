import {CreateTransactionDto, TransactionDto} from "./transaction.dto";
import {TransactionRepository} from "./transaction.repository";

export class TransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    public async create(createTransactionDto: CreateTransactionDto): Promise<TransactionDto | null> {
        return await this.transactionRepository.create(createTransactionDto);
    }

    public async getAll(): Promise<TransactionDto[]> {
        return await this.transactionRepository.getAll();
    }

    public async getById(id: string): Promise<TransactionDto> {
        return await this.transactionRepository.getById(id);
    }

    public async getByNftId(nftId: string): Promise<TransactionDto[]> {
        return await this.transactionRepository.getByNftId(nftId);
    }
}