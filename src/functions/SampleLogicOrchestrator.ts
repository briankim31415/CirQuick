import SampleMongooseModel from "../models/SampleMongooseModel";

export default class SampleLogicOrchestrator {
	static async echo(input: string): Promise<string> {
		const toSave = new SampleMongooseModel();
		toSave.toEcho = input;
		await toSave.save().catch((err) => console.log(err));

		return input;
	}
}
