import fastify, {
    FastifyError,
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest
} from "fastify";
import cors from "@fastify/cors";
import serveStatic from "@fastify/static";
import multipart from "@fastify/multipart";
import formBody from "@fastify/formbody";
import {NftController} from "./nft/nft.controller";
import {TransactionController} from "./transaction/transaction.controller";
import {join} from "path";
import {ApiError} from "./error/api.error";

const app = fastify({logger: true});

const appRouter = async (appRouter: FastifyInstance, _options: FastifyPluginOptions) => {
    appRouter.setErrorHandler((error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
        console.error(error);
        if (error instanceof ApiError) {
            return reply.status(error.statusCode).send({ok: false, message: error.message});
        }
        const data = { ok: false, message: error.message };
        reply.status(500).send(data);
    });
    appRouter.register(NftController, {prefix: "/nft"});
    appRouter.register(TransactionController, {prefix: "/transaction"});
}
app.register(formBody);
app.register(cors);
app.register(serveStatic, {
    root: join(__dirname, '../media'),
    prefix: '/static'
});
app.register(multipart);
app.register(appRouter, {prefix: "/api"});

const start = () => {
    const host = process.env.APP_HOST;
    const port = process.env.APP_PORT;
    app.listen({host, port}, () => {
        console.log(`Server started on port ${port}!`);
    })
}

start();