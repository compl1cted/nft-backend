import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class NftEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({default: "No description"})
    description: string;
    @Column()
    filename: string;
}