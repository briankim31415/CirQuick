import mongoose from "mongoose";

export interface UserInterface {
  userId: string;
  username: string;
  password: string;
  projectsJoined: {
    projectId: string;
    role: "admin" | "member";
  }[];
  transactions: {
    action: "checkin" | "checkout";
    amount: number;
    hwSetId: string; //(hwSetId)
    hwSetName: string;
    projectId: string;
  }[];
}
const schema = new mongoose.Schema<UserInterface>({
  userId: { type: String, required: true, unique:true},
  username: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  projectsJoined: [
    {
      projectId: { type: String, required: true },
      role: { type: String, enum: ["admin", "member"] },
    },
  ],
  transactions: [
    {
      action: { type: String, enum: ["checkin", "checkout"] },
      amount: Number,
      hwSetId: { type: String, required: true }, //(hwSetId)
      hwSetName: { type: String, required: true },
      projectId: { type: String, required: true },
    },
  ],
});

export default mongoose.model<UserInterface>("users", schema);
