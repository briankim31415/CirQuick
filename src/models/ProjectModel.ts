import mongoose from "mongoose";

export interface ProjectInterface {
  projectId: string;
  name: string;
  description: string;
  usersJoined: string[]; //(userIds)
  admin: string; //(userId),
  //Resources is a map with the keys being hwSetIds, and the value being a object
  resources: {
    [index: string]: {
      totalResources: number;
      usersCheckedOut: {
        amount: number;
        checkedOutBy: string; //(Corresponds to userId)
      }[];
    };
  };
  currentResources: number;
  transactions: {
    action: "checkin" | "checkout";
    amount: number;
    hwSetId: string; //(hwSetId)
    hwSetName: string;
    userId: string;
  }[];
}
const schema = new mongoose.Schema<ProjectInterface>({
  projectId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  usersJoined: {type:[String], default:[]},
  admin: { type: String, required: true },
  resources: {
    type: Map,
    of: {
      totalResources: Number,
      usersCheckedOut: [
        {
          amount: Number,
          checkedOutBy: String, //(Corresponds to userId)
        },
      ],
    },
  },
  currentResources:{type:Number,default:0},
  transactions: [
    {
      action: { type: String, enum: ["checkin", "checkout"] },
      amount: Number,
      hwSetId: { type: String, required: true }, //(hwSetId)
      hwSetName: { type: String, required: true },
      userId: { type: String, required: true },
    },
  ],
});
schema.index({name: 'text'});
export default mongoose.model<ProjectInterface>("projects", schema);
