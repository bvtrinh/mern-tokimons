import { IElement } from "../models/Tokimon.model";

export const getHighestType = (elements: IElement) => {
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

  return { type: bestType, total: total };
};
