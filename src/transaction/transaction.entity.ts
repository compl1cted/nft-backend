import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from "typeorm";
import {NftEntity} from "../nft/nft.entity";

@Entity()
export class TransactionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => NftEntity, (nft) => nft.id)
    nft: NftEntity;

    @Column()
    nftId: string;
}