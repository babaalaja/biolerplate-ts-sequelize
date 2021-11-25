import { NextFunction, Request, Response } from "express";

interface CompositeError {
    message: string;
    statusCode: number;
    errors?: Record<string, any>;
}

export default async (err: CompositeError, _: Request, res: Response, __: NextFunction) => {
    const response = err?.errors
        ? { message: err.message, errors: err.errors }
        : { message: err.message };

    return res.status(err.statusCode).json(response);
};
