import { ApplicationError } from "./definitions";

export default class CustomError extends Error {
    statusCode: number;
    constructor(applicationError: ApplicationError) {
        super(applicationError.message);
        this.statusCode = applicationError.statusCode ?? 400;
    }
}
