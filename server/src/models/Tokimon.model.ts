import { Schema, Document, Model, model } from "mongoose";
import { IUser } from "./User.model";

export interface IElement {
  electric: number;
  fly: number;
  fight: number;
  fire: number;
  ice: number;
  water: number;
}

export interface ITokimon extends Document {
  name: string;
  height: number;
  weight: number;
  elements: IElement;
  type: string;
  total: number;
  createdOn: Date;
  owner: IUser["_id"];
}

const TokimonSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  elements: {
    electric: { type: Number, required: true },
    fly: { type: Number, required: true },
    fight: { type: Number, required: true },
    fire: { type: Number, required: true },
    ice: { type: Number, required: true },
    water: { type: Number, required: true },
  },
  type: { type: String, required: true },
  total: { type: Number, required: true },
  createdOn: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId },
});

export const Tokimon: Model<ITokimon> = model<ITokimon>(
  "Tokimon",
  TokimonSchema
);
