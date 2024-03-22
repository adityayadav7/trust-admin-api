import mongoose, { Document, Schema } from "mongoose";
import { Roles } from "../../enums/Roles";

export interface User {
  id: string;

  username: string;

  password: string;

  role: Roles[];

  description?: string;

  created: Date;

  lastModified: Date;
}
const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: String, enum: Object.values(Roles) }], // Assuming Roles is an enum
  description: { type: String },
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User>("User", userSchema);

export { UserModel };
