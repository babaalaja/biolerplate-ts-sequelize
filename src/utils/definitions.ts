import { Request, Response, NextFunction } from "express";
import { AsyncCheckFunction, SyncCheckFunction } from "fastest-validator";
import { Sequelize, QueryInterface, Model, BuildOptions } from "sequelize";
import { Umzug } from "umzug";
import CustomError from "./error";

export type Controller = (req: Request, res: Response, next: NextFunction) => void;

export type ModelType = Record<
    string,
    typeof Model & (new (values?: object, options?: BuildOptions) => Model<any, any>)
>;

export interface ApplicationError {
    errors?: Record<string, string>;
    message: string;
    statusCode?: number;
}

export interface ApplicationConfigOptions {
    port?: number;
}

type ApplicationErrorType = (error: ApplicationError) => never;

type SchemaValidatorType = (
    schema: SyncCheckFunction | AsyncCheckFunction,
    payload: unknown
) => Promise<unknown>;

type manageAsyncOpsType = (
    fn: Promise<any>
) => Promise<[null | typeof CustomError, null | unknown]>;

export interface RequestContext {
    sequelize: Sequelize;
    migrationManager: Umzug<QueryInterface>;
    messages: ServerMessage;
    models: ModelType;
    manageAsyncOps: manageAsyncOpsType;
    validateSchema: SchemaValidatorType;
    manageApplicationErrors: ApplicationErrorType;
    appConfig: ApplicationConfigOptions;
}

export interface ApplicationResponseInterface {
    message?: string;
    statusCode?: number;
    data?: Record<string, any>;
}

export interface ServerMessage {
    responses: Record<string, Record<string, string>>;
    errors: Record<string, Record<string, string>>;
}
