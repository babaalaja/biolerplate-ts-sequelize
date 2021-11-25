import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import * as SuperTest from "supertest";
import handleApplicationErrors from "./error";
import handleApplicationResponse from "./response";
import { ApplicationResponseInterface, RequestContext } from "../utils/definitions";
import { buildRequestContext } from "./context";

// Nifty Procedure to extend Express Request and Response
declare global {
    namespace Express {
        interface Request {
            context: RequestContext;
        }
        interface Response {
            response: ApplicationResponseInterface;
        }
    }
}

const server = express();

let requestContext: RequestContext;

server.use(helmet());

if (process.env.NODE_ENV === "development") {
    server.use(compression()); // I am using compression in dev mode, in production Nginx will handle this
}

server.use(cors());

server.use(async (req: Request, res: Response, next: NextFunction) => {
    req.context = requestContext;
    return next();
});

server.all("/", async (req: Request, res: Response, next: NextFunction) => {
    res.response = {
        message: "Hello World",
    };
    return next();
});

server.use(handleApplicationResponse);

server.use(handleApplicationErrors);

export const startApplicationServer = async () => {
    requestContext = await buildRequestContext();
    server.listen(requestContext.appConfig.port, () => console.log("Server started"));
};
