import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import User, { IUser, UserForm, LoginForm } from "../models/User.model";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/constants";

export const createUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, password } = req.body as UserForm;

  try {
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser: IUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPass,
      createdOn: new Date(),
    });

    await newUser.save();
    return res.status(200).json({ message: "Created new user", error: false });
  } catch (err) {
    // In case of duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({
        payload: err,
        message: `Duplicate key error (${JSON.stringify(err.keyValue)})`,
        error: true,
      });
    }
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body as LoginForm;

  try {
    const possibleUser = await User.findOne({ email: email });

    if (!possibleUser) throw new Error("Invalid username and/or password");

    const isMatchPass = await bcrypt.compare(
      password,
      possibleUser.password as string
    );

    if (isMatchPass) {
      return res
        .status(200)
        .json({ message: "Login successful", error: false });
    } else {
      throw new Error("Invalid username and/or password");
    }
  } catch (err) {
    return res.status(400).json({
      payload: err,
      message: err.message,
      error: true,
    });
  }
};
