import { AsyncCheckFunction, SyncCheckFunction, ValidationError } from "fastest-validator";
import { ApplicationError } from "./definitions";
import CustomError from "./error";

export const validateSchema = async (
    schema: SyncCheckFunction | AsyncCheckFunction,
    payload: any
): Promise<any> | never => {
    const validationStatus = await schema(payload);
    if (Array.isArray(validationStatus)) {
        const errors = validationStatus.reduce((errors, currentError: ValidationError) => {
            return currentError?.field && currentError?.message
                ? { ...errors, [currentError?.field]: currentError?.message }
                : errors;
        }, {} as Record<string, string>);

        manageApplicationErrors({
            errors,
            message: "You have sent incorrect parameters for this request",
            statusCode: 422,
        });
    }
    return payload;
};

export const manageApplicationErrors = (applicationError: ApplicationError): never => {
    throw new CustomError(applicationError);
};

export const manageAsyncOps = async (
    fn: Promise<unknown>
): Promise<[null | typeof CustomError, null | unknown]> => {
    try {
        const response = await fn;
        return [null, response];
    } catch (error: unknown) {
        const applicationError = error as typeof CustomError;
        return [applicationError, null];
    }
};
