import passport from "passport";
import jwt from "jsonwebtoken";
import { Request, Response, RequestHandler } from "express";
import { validationResult } from "express-validator";
import { User, UserForm } from "../models/User.model";
import { Token } from "../models/Token.model";
import { ACCESS_COOKIE_EXPIRY_TIME, REFRESH_COOKIE_EXPIRY_TIME } from "../config/constants";
import { loginStrategy } from "../auth/local";
passport.use("login", loginStrategy);

interface JWTPayloadTypes {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

export const createUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, password } = req.body as UserForm;

  try {
    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
    });

    await newUser.save();

    return res
      .cookie("ACCESS_TOKEN", await newUser.createAccessToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: ACCESS_COOKIE_EXPIRY_TIME,
      })
      .cookie("REFRESH_TOKEN", await newUser.createRefreshToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: REFRESH_COOKIE_EXPIRY_TIME,
      })
      .status(200)
      .json({
        expiryTime: Date.now() + ACCESS_COOKIE_EXPIRY_TIME,
        firstName: newUser.firstName,
        message: "Successful in creating user",
        error: false,
      });
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

export const loginUser = (req: Request, res: Response): void => {
  passport.authenticate("login", { session: false }, async function (err, user, info) {
    if (err) {
      return res.status(401);
    }
    if (!user) {
      return res.status(401).json({ error: true, message: info.message });
    } else {
      return res
        .cookie("ACCESS_TOKEN", await user.createAccessToken(), {
          httpOnly: true,
          sameSite: "lax",
          maxAge: ACCESS_COOKIE_EXPIRY_TIME,
        })
        .cookie("REFRESH_TOKEN", await user.createRefreshToken(), {
          httpOnly: true,
          sameSite: "lax",
          maxAge: REFRESH_COOKIE_EXPIRY_TIME,
        })
        .status(200)
        .json({
          expiryTime: Date.now() + ACCESS_COOKIE_EXPIRY_TIME,
          firstName: user.firstName,
          message: "Successful login",
          error: false,
        });
    }
  })(req, res);
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

export const renewTokens = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies["REFRESH_TOKEN"];
    if (!refreshToken)
      return res.status(401).json({ message: "Access denied, token missing", error: true });

    const refreshTokenDB = await Token.findOne({ token: refreshToken });
    if (!refreshTokenDB) {
      return res.status(401).json({ message: "Access denied, token missing", error: true });
    }

    const payload = jwt.verify(
      refreshTokenDB.token,
      process.env.REFRESH_TOKEN_SECRET as jwt.Secret
    );

    const user = await User.findById((payload as JWTPayloadTypes)._id);

    await Token.deleteOne({ token: refreshTokenDB.token });

    return res
      .cookie("ACCESS_TOKEN", await user.createAccessToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: ACCESS_COOKIE_EXPIRY_TIME,
      })
      .cookie("REFRESH_TOKEN", await user.createRefreshToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: REFRESH_COOKIE_EXPIRY_TIME,
      })
      .status(200)
      .json({
        expiryTime: Date.now() + ACCESS_COOKIE_EXPIRY_TIME,
        firstName: user.firstName,
        message: "Successful refreshing tokens",
        error: false,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: "Error refreshing tokens",
      error: true,
    });
  }
};
