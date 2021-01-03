import { RequestHandler } from "express";
import { ITokimon, IElement } from "../models/Tokimon.model";

const getHighestType = (elements: IElement) => {
  let bestType: string = "";
  let bestVal: number = -1;
  let total: number = 0;

  for (let [key, val] of Object.entries(elements)) {
    if (val > bestVal) {
      bestVal = val;
      bestType = key;
    }
    total += val;
  }
  console.log(bestVal, bestType, total);
  return { type: bestType, total: total };
};

export const createToki: RequestHandler = (req, res, next) => {
  // Extract information from request
  const tokiData = req.body;

  const elements = tokiData.elements;
  const { type, total } = getHighestType(elements);

  const toki: ITokimon = {
    ...tokiData,
    type: type,
    total: total,
    createdOn: new Date(),
  };

  // Make DB write

  res.status(201).json({ message: "Created the Tokimon.", createdToki: toki });
};
