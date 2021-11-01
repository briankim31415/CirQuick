import express from "express";
import mongoose from "mongoose";
import * as swaggerUI from "swagger-ui-express";

import Constants from "./config/Constants";
import { RegisterRoutes } from "./routes/routes";

import type { Request, Response, NextFunction } from "express";

const app = express();

const preprocessRequest = (req: Request, res: Response, next: NextFunction) => {
	console.log(new Date().toLocaleTimeString() + ": " + req.method + " " + req.url);
	res.append("Access-Control-Allow-Origin", ["*"]);
	res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type, Origin, Authorization");
	next();
};

const main = async () => {
	// middleware
	app.use(express.json(/* { limit: '10kb' } */));
	app.use(express.urlencoded({ extended: true }));
	app.use(preprocessRequest);

	RegisterRoutes(app);

	try {
		const swaggerDocument = require("../public/swagger.json");
		app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
	} catch (err) {
		console.error("Unable to read swagger.json", err);
	}
	mongoose
		.connect(Constants.mongoUrl)
		.then(() => console.log(`Mongo Connection: ${Constants.mongoUrl}`))
		.catch((err) => console.log(err));

	const port = process.env.PORT??3000;
	app.listen(port, () => {
		console.log(Constants.serviceName + " : " + Constants.version);
		console.log(`HTTP ${Constants.serviceName} on ${port}!`);
	});
};

main().catch((err) => console.log(err));

export default app;

//DO NOT DELETE: NEEDED FOR TSOA AUTH
export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
	return Promise.resolve();
}