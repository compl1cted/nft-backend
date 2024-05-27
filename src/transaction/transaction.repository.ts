import {Repository} from "typeorm";
import {TransactionEntity} from "./transaction.entity";
import {CreateTransactionDto, TransactionDto} from "./transaction.dto";
import {TransactionEntityToDto} from "./transaction.mapper";

export class TransactionRepository {
    constructor(private readonly repository: Repository<TransactionEntity>) {}

    public async create(createNftDto: CreateTransactionDto): Promise<TransactionDto | null> {
        const newEntity = await this.repository.save(createNftDto);
        if (!newEntity) {
            return null;
        }

        return TransactionEntityToDto(newEntity)
    }

    public async getAll(): Promise<TransactionDto[]> {
        const entities = await this.repository.find();
        return entities.map(entity => TransactionEntityToDto(entity));
    }

    public async getById(id: string): Promise<TransactionDto | null> {
        const entity = await this.repository.findOneBy({id});
        return TransactionEntityToDto(entity);
    }

    public async getByNftId(nftId: string): Promise<TransactionDto[]> {
        const entities = await this.repository.findBy({nftId});
        return entities.map(entity => TransactionEntityToDto(entity));
    }
}