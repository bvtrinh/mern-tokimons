import { Schema, Document, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/constants";
import jwt from "jsonwebtoken";
import Token from "./Token.model";
import {
  JWT_ACCESS_EXPIRY_TIME,
  JWT_REFRESH_EXPIRY_TIME,
} from "../config/constants";
export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdOn: Date;
  createAccessToken: () => void;
  createRefreshToken: () => void;
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
  createdOn: { type: Date, required: true, default: new Date() },
});

UserSchema.pre("save", async function (this: IUser, next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
});

UserSchema.methods = {
  createAccessToken: async function (this: IUser) {
    try {
      const { _id, email } = this;
      return jwt.sign(
        { _id, email },
        process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
        {
          expiresIn: JWT_ACCESS_EXPIRY_TIME,
        }
      );
    } catch (err) {
      console.log(err);
      return;
    }
  },
  createRefreshToken: async function (this: IUser) {
    try {
      const { _id, email } = this;
      const refreshToken = jwt.sign(
        { _id, email },
        process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
        {
          expiresIn: JWT_REFRESH_EXPIRY_TIME,
        }
      );

      await new Token({ token: refreshToken }).save();
      return refreshToken;
    } catch (err) {
      console.log(err);
      return;
    }
  },
};

export const User: Model<IUser> = model<IUser>("User", UserSchema);
