import {CreateNftDto} from "./nft.dto";
import {NftRepository} from "./nft.repository";

export class NftService {
    constructor(private readonly nftRepository: NftRepository) {}

    async create(createNftDto: CreateNftDto) {
        return await this.nftRepository.create(createNftDto);
    }

    async getAll() {
        return await  this.nftRepository.getAll();
    }

    async getById(id: string) {
        return await this.nftRepository.getById(id);
    }
}