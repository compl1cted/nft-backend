import {ApiError} from "./api.error";

export class ErrorService {
    static BadRequestException(error: string) {
        throw new ApiError(400, error);
    }
}