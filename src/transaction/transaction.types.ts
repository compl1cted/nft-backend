import {FastifyRequest} from "fastify";

export type CreateTransactionRequest = FastifyRequest<{Body: { nftId: string }}>;
export type GetTransactionByIdRequest = FastifyRequest<{Params: {id: string}}>;
export type GetTransactionByNftIdRequest = FastifyRequest<{Params: {nftId: string}}>;