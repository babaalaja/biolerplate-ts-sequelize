import { Controller } from "../utils/definitions";

const handleApplicationResponse: Controller = async (_, res, __) => {
    const { message, data, statusCode = 200 } = res.response;
    return data || message ? res.status(statusCode).json({ message, data }) : res.sendStatus(404);
};

export default handleApplicationResponse;
