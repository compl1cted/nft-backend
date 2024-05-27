import {NftRepository} from "./nft.repository";
import {NftService} from "./nft.service";
import {dbModule} from "../database/database.module";
import {NftEntity} from "./nft.entity";

export class NftModule {
    private readonly repository: NftRepository;
    private readonly service: NftService;

    constructor() {
        const nftTypeOrmRepo = dbModule.getService().getRepository(NftEntity);
        this.repository = new NftRepository(nftTypeOrmRepo);
        this.service = new NftService(this.repository);
    }

    public getService = () => this.service;
}

export const nftModule = new NftModule();