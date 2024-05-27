import {Repository} from "typeorm";
import {CreateNftDto, NftDto} from "./nft.dto";
import {NftEntity} from "./nft.entity";
import {NftEntityToDto} from "./nft.mapper";

export class NftRepository {
    constructor(private readonly repository: Repository<NftEntity>) {}

    async create(createNftDto: CreateNftDto): Promise<NftDto | null> {
        const newEntity = await this.repository.save(createNftDto);
        if (!newEntity) {
            return null;
        }

        return NftEntityToDto(newEntity)
    }

    async getAll(): Promise<NftDto[]> {
        const entities = await this.repository.find();
        return entities.map(entity => NftEntityToDto(entity));
    }

    async getById(id: string) {
        const entity = await this.repository.findOneBy({id});
        if (!entity) {
            return null;
        }
        return NftEntityToDto(entity);
    }
}