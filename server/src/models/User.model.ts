import mongoose, { Schema, Document } from "mongoose";

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
  password: { type: String },
  createdOn: { type: Date, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
