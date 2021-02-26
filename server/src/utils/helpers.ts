import { IElement } from "../models/Tokimon.model";

export const getHighestType = (elements: IElement): { type: string; total: number } => {
  let bestType = "";
  let bestVal = -1;
  let total = 0;

  for (const [key, val] of Object.entries(elements)) {
    if (val > bestVal) {
      bestVal = val;
      bestType = key;
    }
    total += val;
  }

  return { type: bestType, total: total };
};
