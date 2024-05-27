import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import {GetTransactionByIdRequest, GetTransactionByNftIdRequest} from "./transaction.types";
import {CreateTransactionRequest} from "./transaction.types";
import {ErrorService} from "../error/error.service";
import {transactionModule} from "./transaction.module";
import {nftModule} from "../nft/nft.module";

export const TransactionController = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const transactionService = transactionModule.getService();
    const nftService = nftModule.getService();

    const validateNftId = async (id: string) => {
        if (!id) {
            ErrorService.BadRequestException('No id provided!');
        }
        if (id.length !== 36) {
            ErrorService.BadRequestException('Invalid NFT id!');
        }

        const nft = await nftService.getById(id);
        if (!nft) {
            ErrorService.BadRequestException('Nft does not exist!');
        }
    }

    fastify.addContentTypeParser('application//x-www-form-urlencoded', (request, body, done) => {} )

    fastify.post('/', {}, async (req: CreateTransactionRequest, reply: FastifyReply) => {
        console.log(req.body);
        const {nftId} = req.body;
        await validateNftId(nftId);
        const newTransaction = await transactionService.create({nftId});
        reply.send(newTransaction).status(201);
    });

    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        const transactions = await transactionService.getAll();
        reply.send({ data: transactions });
    });

    fastify.get('/:id', async (req: GetTransactionByIdRequest, reply: FastifyReply) => {
        const { id } = req.params;
        const transaction = await transactionService.getById(id);
        reply.send({ data: transaction });
    });

    fastify.get('/nft/:nftId', async (req: GetTransactionByNftIdRequest, reply: FastifyReply) => {
        const { nftId } = req.params;
        await validateNftId(nftId);
        const transactions = await transactionService.getByNftId(nftId);
        reply.send({ data: transactions });
    });
};