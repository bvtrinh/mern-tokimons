import passport from "passport";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";
import User, { IUser, UserForm, LoginForm } from "../models/User.model";
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

        return res
          .cookie("ACCESS-TOKEN", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 15 * 1000 * 60,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("REFRESH-TOKEN", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production",
          })
          .sendStatus(200);
      }
    }
  )(req, res);
};
