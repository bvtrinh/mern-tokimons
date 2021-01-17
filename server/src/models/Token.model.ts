import { Schema, Document, Model, model } from "mongoose";
import { REFRESH_MONGO_EXPIRY_TIME } from "../config/constants";

export interface IToken extends Document {
  token: string;
  expiryAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: { type: String },
  expireAt: {
    type: Date,
    default: Date.now(),
    expires: REFRESH_MONGO_EXPIRY_TIME,
  },
});

export const Token: Model<IToken> = model<IToken>("Token", TokenSchema);
