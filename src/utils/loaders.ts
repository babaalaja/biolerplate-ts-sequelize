import Glob from "glob";
import { BuildOptions, Model, Sequelize } from "sequelize";
import CustomError from "./error";

const MODEL_PATHS = `${process.cwd()}/**/*.model.js`;

const fetchModelPaths = (): Promise<string[]> =>
    new Promise((resolve, reject) => {
        Glob(MODEL_PATHS, (error, matches) => {
            if (error) {
                if (process.env.NODE_ENV !== "prod") console.log(error);
                return reject(new Error("Model paths could not be loaded"));
            }
            return resolve(matches);
        });
    });

export const loadModels = async (
    connection: Sequelize
): Promise<
    Record<string, typeof Model & { new (values?: object, options?: BuildOptions): Model }>
> => {
    let applicationModels: Record<
        string,
        typeof Model & { new (values?: object, options?: BuildOptions): Model }
    > = {};
    try {
        const modelPaths = await fetchModelPaths();
        if (modelPaths.length === 0) return applicationModels;
        modelPaths.forEach(modelPath => {
            const model = require(modelPath).default;
            applicationModels = Object.assign({}, applicationModels, model(connection));
        });

        return applicationModels;
    } catch (error) {
        const applicationError = error as CustomError;
        throw new CustomError({ message: applicationError.message });
    }
};
