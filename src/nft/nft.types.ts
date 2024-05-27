import {FastifyRequest} from "fastify";

type CreateNftBody = {name: string, description: string};

export type CreateNftRequest = FastifyRequest<{Body: CreateNftBody}>
export type GetNftByIdRequest = FastifyRequest<{Params: {id: string}}>