import mongoose from "mongoose";

export interface ResourceInterface {
  hwSetId: string;
  hwSetName: string;
  capacity: number;
  availablity: number;

  //Transactions is not necessary
  transactions: [
    {
      action: "checkin" | "checkout";
      amount: number;
      userId: string;
      projectId: string;
    }
  ];
}

const schema = new mongoose.Schema<ResourceInterface>({
    hwSetId: { type: String, required: true, unique: true },
    hwSetName: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    availablity: { type: Number, required: true },
    transactions: {type:[
      {
        action: { type: String, enum: ["checkin", "checkout"] },
        amount: Number,
        userId: { type: String, required: true }, //(hwSetId)
        projectId: { type: String, required: true },
      },
    ]}
  });
  
  export default mongoose.model<ResourceInterface>("resources", schema);
