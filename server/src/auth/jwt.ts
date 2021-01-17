import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Token from "../models/Token.model";
import { User } from "../models/User.model";
import {
  ACCESS_COOKIE_EXPIRY_TIME,
  REFRESH_COOKIE_EXPIRY_TIME,
} from "../config/constants";

interface JWTPayloadTypes {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["ACCESS_TOKEN"];

    if (!accessToken) throw new Error("No access token");

    const isVerified = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret
    );
    if (!isVerified) throw new Error("Invalid JWT Token");
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: true, message: err.message });
  }
};

export const renewTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies["REFRESH_TOKEN"];
    if (!refreshToken)
      return res
        .status(401)
        .json({ message: "Access denied, token missing", error: true });

    const refreshTokenDB = await Token.findOne({ token: refreshToken });
    if (!refreshTokenDB) {
      return res
        .status(401)
        .json({ message: "Access denied, token missing", error: true });
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
        secure: process.env.NODE_ENV === "production",
      })
      .cookie("REFRESH_TOKEN", await user.createRefreshToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: REFRESH_COOKIE_EXPIRY_TIME,
        secure: process.env.NODE_ENV === "production",
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
