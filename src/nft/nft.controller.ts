import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import {nftModule} from "./nft.module";
import {CreateNftRequest, GetNftByIdRequest} from "./nft.types";
import {FileService} from "../file/file.service";

export const NftController = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const nftService = nftModule.getService();

    fastify.post('/', async (req: CreateNftRequest, reply: FastifyReply) => {
        const data = await req.file();
        const name = data.fields['name']['value']; //Это ужасно, согласен)
        const description = data.fields['description']['value'];
        const filename = await FileService.saveFile(data.file, data.mimetype);
        const newNft = await nftService.create({name, description, filename});
        reply.send(newNft).status(201);
    });

    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        const items = await nftService.getAll();
        reply.send({ data: items }).status(200);
    });

    fastify.get('/:id', async (req: GetNftByIdRequest, reply: FastifyReply) => {
        const { id } = req.params;
        const nft = await nftService.getById(id);
        reply.send({ data: nft }).status(200);
    });
};