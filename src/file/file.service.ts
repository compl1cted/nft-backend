import {join} from 'path';
import {createWriteStream} from 'node:fs';
import {promisify} from 'node:util';
import {pipeline} from 'node:stream';
import {randomUUID} from 'crypto';
import {BusboyFileStream} from "@fastify/busboy";

export const pump = promisify(pipeline)

export class FileService {
    public static async saveFile(file: BusboyFileStream, mimetype: string): Promise<string> {
        const fileId = randomUUID();
        let extension = mimetype.split('/')[1];
        const filename = `${fileId}.${extension}`
        await pump(file, createWriteStream(join(__dirname, '../', '../media', filename)));
        return filename;
    }
}