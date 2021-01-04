import { RequestHandler } from "express";
import Tokimon, { ITokimon, IElement } from "../models/Tokimon.model";
import { validationResult } from "express-validator";

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

  return { type: bestType, total: total };
};

export const createToki: RequestHandler = async (req, res) => {
  // Extract information from request
  const tokiData = req.body;

  // Validate data here
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { type, total } = getHighestType(tokiData.elements);

  const newToki: ITokimon = new Tokimon({
    ...tokiData,
    type: type,
    total: total,
    createdOn: new Date(),
  });

  // Make DB write
  try {
    await newToki.save();

    return res
      .status(200)
      .json({ message: "Created the Tokimon.", createdToki: newToki });
  } catch (err) {
    // In case of duplicate key errors
    if (err.code === 11000) {
      return res.status(422).json({
        errors: `Duplicate key error (${JSON.stringify(err.keyValue)})`,
      });
    }
  }
};

export const getAllToki: RequestHandler = async (req, res) => {
  try {
    const tokimons = await Tokimon.find();
    return res.status(200).json({ tokimons: tokimons });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const getOneToki: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const tokimon = await Tokimon.findById(id);
    return res.status(200).json(tokimon);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const updateToki: RequestHandler = async (req, res) => {
  // Extract information from URL
  const id = req.params.id;
  const newToki: ITokimon = req.body;

  // Find the Tokimon in DB
  try {
    const oldToki = await Tokimon.findById(id);
    if (!oldToki) {
      // ID does not exist
      throw new Error("ID does not exist");
    }

    // Validate the new fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Update in case the Tokimon has a new higher value to determine its type
    const { type, total } = getHighestType(newToki.elements);
    newToki.type = type;
    newToki.total = total;

    // Update on DB
    await Tokimon.updateOne({ _id: id }, newToki);

    return res
      .status(200)
      .json({ message: "Updated the Tokimon.", updatedToki: newToki });
  } catch (err) {
    // If it hits here most likely unable to find Tokimon
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteToki: RequestHandler = async (req, res) => {
  // Extract information from URL
  const id = req.params.id;

  // Delete the Tokimon in DB
  try {
    await Tokimon.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted the Tokimon." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
