import passportLocal from "passport-local";
import { User } from "../models/User.model";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const LocalStrategy = passportLocal.Strategy;

export const loginStrategy = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "password",
  },
  async (req, email, password, done) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return done(undefined, false, { message: errors.array()[0].msg });
    }
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(undefined, false, {
          message: "Invalid username and/or password",
        });
      }

      const isMatchPass = await bcrypt.compare(
        password,
        user.password as string
      );

      if (isMatchPass) {
        return done(undefined, user, { message: "Login successful" });
      } else {
        return done(undefined, false, {
          message: "Invalid username and/or password",
        });
      }
    } catch (err) {
      console.log(err);
      return done(undefined, false, { message: "server error" });
    }
  }
);
