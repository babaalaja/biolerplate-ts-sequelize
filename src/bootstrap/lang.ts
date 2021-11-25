export const loadResponseMessages = () => {
    const responses: Record<
        string,
        Record<string, string>
    > = require(`${process.cwd()}/dist/lang/response.js`);
    const errors: Record<
        string,
        Record<string, string>
    > = require(`${process.cwd()}/dist/lang/error.js`);

    return { responses, errors };
};
