import { Body, Controller, Post, Route, Security } from "tsoa";

import SampleLogicOrchestrator from "../functions/SampleLogicOrchestrator";
import { HttpStatusCode } from "../utils/ErrorCodes";

@Route("/echo")
export class SampleController extends Controller {
	@Post()
	@Security("api_key")
	public async exampleEcho(@Body() body: { toEcho: string }): Promise<{ echoed: string }> {
		try {
			const output = await SampleLogicOrchestrator.echo(body.toEcho);
			return { echoed: output };
		} catch (error) {
			this.setStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
			console.log(error);
		}
	}
}
