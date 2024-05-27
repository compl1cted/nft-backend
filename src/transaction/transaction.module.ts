import {TransactionRepository} from "./transaction.repository";
import {TransactionService} from "./transaction.service";
import {dbModule} from "../database/database.module";
import {TransactionEntity} from "./transaction.entity";

export class TransactionModule {
    private readonly repository: TransactionRepository;
    private readonly service: TransactionService;
    constructor() {
        const repo = dbModule.getService().getRepository(TransactionEntity);
        this.repository = new TransactionRepository(repo);
        this.service = new TransactionService(this.repository);
    }

    public getService = () => this.service;
}

export const transactionModule = new TransactionModule();