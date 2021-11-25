import { Sequelize, Options, QueryInterface } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import * as cls from "cls-hooked";

const namespace = cls.createNamespace("base-namespace");
Sequelize.useCLS(namespace);

export const setupConnection = async (
    config: Options
): Promise<{ sequelize: Sequelize; migrationManager: Umzug<QueryInterface> }> => {
    const sequelize = new Sequelize(config);
    const migrationManager = setupMigrationManager(sequelize);
    return { sequelize, migrationManager };
};

const setupMigrationManager = (sequelize: Sequelize) =>
    new Umzug({
        migrations: { glob: `${process.cwd()}/database/migrations` },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    });
