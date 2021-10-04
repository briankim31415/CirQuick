import mongoose from "mongoose";

export interface SampleSchemaInterface {
	toEcho: string;
}
const sampleSchema = new mongoose.Schema<SampleSchemaInterface>({
	toEcho: { type: String, required: true },
});

export default mongoose.model<SampleSchemaInterface>("SampleSchema", sampleSchema);
