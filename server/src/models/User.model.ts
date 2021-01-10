import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/constants";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdOn: Date;
}

export interface UserForm extends IUser {
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, required: true },
});

UserSchema.pre("save", async function (this: IUser, next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
});

export default mongoose.model<IUser>("User", UserSchema);
