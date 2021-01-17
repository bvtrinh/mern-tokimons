import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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
