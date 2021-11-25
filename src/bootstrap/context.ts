import { buildConfiguration } from "../config";
import { loadModels, validateSchema, manageApplicationErrors, manageAsyncOps } from "../utils";
import { RequestContext } from "../utils/definitions";
import { setupConnection } from "./database";
import { loadResponseMessages } from "./lang";

export const buildRequestContext = async (): Promise<RequestContext> => {
    const { db: dbConfig, app: appConfig } = await buildConfiguration();
    const { sequelize, migrationManager } = await setupConnection(dbConfig);

    const messages = loadResponseMessages();
    const models = await loadModels(sequelize);

    return {
        sequelize,
        migrationManager,
        messages,
        models,
        validateSchema,
        manageAsyncOps,
        manageApplicationErrors,
        appConfig,
    };
};
