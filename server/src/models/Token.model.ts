import mongoose, { Schema, Document } from "mongoose";
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

export default mongoose.model<IToken>("Token", TokenSchema);
