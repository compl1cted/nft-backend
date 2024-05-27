export class CreateNftDto {
    name: string;
    description: string;
    filename: string;
}

export class NftDto {
    id: string;
    name: string;
    description: string;
    filename: string;

    constructor(id: string, name: string, description: string, filename: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.filename = filename;
    }
}