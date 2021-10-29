import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
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

schema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export default mongoose.model<UserInterface>("users", schema);
