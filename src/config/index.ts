import dotenv from "dotenv";
import { validateSchema } from "../utils/commons";
import { ConfigurationSchema } from "./schema";
import { Dialect, Options } from "sequelize";
import { ApplicationConfigOptions } from "../utils/definitions";
dotenv.config();

interface Configuration {
    db: Options;
    app: ApplicationConfigOptions;
}

const configuration: Configuration = {
    db: {
        username: process.env.DB_USER,
        host: process.env.DB_HOST,
        dialect: "postgres" as Dialect,
        port: +process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    app: {
        port: +process.env.APPLICATION_PORT,
    },
};
export const buildConfiguration = (): Promise<Configuration> =>
    validateSchema(ConfigurationSchema, configuration);
