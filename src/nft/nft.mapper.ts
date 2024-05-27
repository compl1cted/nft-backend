import {NftEntity} from "./nft.entity";
import {NftDto} from "./nft.dto";

export const NftEntityToDto = (entity: NftEntity): NftDto => {
    const {id, name, description, filename} = entity;
    return new NftDto(id, name, description, filename);
}