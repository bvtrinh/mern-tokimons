import passport from "passport";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";
import User, { IUser, UserForm, LoginForm } from "../models/User.model";
import Token from "../models/Token.model";
import {
  ACCESS_COOKIE_EXPIRY_TIME,
  REFRESH_COOKIE_EXPIRY_TIME,
} from "../config/constants";
import { loginStrategy } from "../auth/local";
passport.use("login", loginStrategy);

export const createUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, password } = req.body as UserForm;

  try {
    const newUser: IUser = new User({
      email,
      firstName,
      lastName,
      password,
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

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "login",
    { session: false },
    async function (err, user, info) {
      if (err) {
        return res.status(401);
      }
      if (!user) {
        return res.status(401).json({ error: true, message: info.message });
      } else {
        const accessToken = await user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        const expiryTime = Date.now() + ACCESS_COOKIE_EXPIRY_TIME;

        return res
          .cookie("ACCESS_TOKEN", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: ACCESS_COOKIE_EXPIRY_TIME,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("REFRESH_TOKEN", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: REFRESH_COOKIE_EXPIRY_TIME,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({ expiryTime: expiryTime, firstName: user.firstName });
      }
    }
  )(req, res);
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    const rToken = req.cookies["REFRESH_TOKEN"];
    res.clearCookie("ACCESS_TOKEN");
    res.clearCookie("REFRESH_TOKEN");
    await Token.deleteOne({ token: rToken });
    return res.status(200).json({
      message: "Successful logout",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: err.message,
      error: true,
    });
  }
};
