import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Token from "../models/Token.model";
import User from "../models/User.model";
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
    return res.sendStatus(403);
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

    // This will save the refresh token in the DB
    const newAccessToken = await user.createAccessToken();
    const newRefreshToken = await user.createRefreshToken();

    return res
      .cookie("ACCESS-TOKEN", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: ACCESS_COOKIE_EXPIRY_TIME,
        secure: process.env.NODE_ENV === "production",
      })
      .cookie("REFRESH-TOKEN", newRefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: REFRESH_COOKIE_EXPIRY_TIME,
        secure: process.env.NODE_ENV === "production",
      })
      .sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(401);
  }
};
