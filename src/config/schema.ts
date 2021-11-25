import Validator from "fastest-validator";

const ConfigurationValidator = new Validator({
    defaults: {
        object: {
            $$strict: "remove",
        },
    },
});

export const ConfigurationSchema = ConfigurationValidator.compile({
    db: {
        type: "object",
        props: {
            username: { type: "string", empty: false, trim: true },
            host: { type: "string", empty: false, trim: true },
            dialect: { type: "string", default: "postgres", optional: true },
            port: { type: "number", default: 5432 },
            password: { type: "string", empty: false },
            database: { type: "string", empty: false, trim: true },
        },
    },
    app: {
        type: "object",
        props: {
            port: { type: "number", default: 50960 },
        },
    },
});
