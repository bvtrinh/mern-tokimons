import { body } from "express-validator";
import User, { IUser } from "../../models/User.model";
import {
  MIN_LEN,
  MIN_LEN_PASS,
  MIN_LEVEL,
  MAX_LEN,
  MAX_LEN_PASS,
  MAX_LEVEL,
} from "../../config/constants";

export const tokiValidation = [
  body("name", "Invalid name")
    .exists()
    .isString()
    .isLength({ min: MIN_LEN, max: MAX_LEN }),
  body("height", "Invalid height").exists().isInt({ min: 1 }),
  body("weight", "Invalid weight").exists().isInt({ min: 1 }),
  body("elements.electric", "Invalid Electric Level")
    .exists()
    .isInt({ min: MIN_LEVEL, max: MAX_LEVEL }),
  body("elements.fly", "Invalid Fly Level")
    .exists()
    .isInt({ min: MIN_LEVEL, max: MAX_LEVEL }),
  body("elements.fight", "Invalid Fight Level")
    .exists()
    .isInt({ min: MIN_LEVEL, max: MAX_LEVEL }),
  body("elements.fire", "Invalid Fire Level")
    .exists()
    .isInt({ min: MIN_LEVEL, max: MAX_LEVEL }),
  body("elements.ice", "Invalid Ice Level")
    .exists()
    .isInt({ min: MIN_LEVEL, max: MAX_LEVEL }),
  body("elements.water", "Invalid Water Level")
    .exists()
    .isInt({ min: MIN_LEVEL, max: MAX_LEVEL }),
];

export const userSignUpValidation = [
  body("email", "Invalid email")
    .exists()
    .withMessage("Email is required")
    .isString()
    .withMessage("Must be a string")
    .isEmail()
    .withMessage("Must be a valid email")
    .isLength({ max: MAX_LEN })
    .withMessage("Max length is 128")
    .custom(async (val) => {
      const user: IUser = await User.find({ email: val });

      if (user) throw new Error("Email already in use");
    }),
  body("firstName", "Invalid first name")
    .exists()
    .withMessage("First name is required")
    .isString()
    .withMessage("Must be a string")
    .isLength({ min: MIN_LEN, max: MAX_LEN })
    .withMessage("Minimum lenth is 2 and maximum length is 128"),
  body("lastName", "Invalid last name")
    .exists()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Must be a string")
    .isLength({ min: MIN_LEN, max: MAX_LEN }),
  body("password", "Invalid password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Must be a string")
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i)
    .withMessage(
      "Must contain at least 1 uppercase, 1 lowercase and 1 special character"
    )
    .isLength({ min: MIN_LEN_PASS, max: MAX_LEN_PASS })
    .withMessage(`Minimum length is ${MIN_LEN_PASS}`),
  body("confirmPassword", "Invalid password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Must be a string")
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i)
    .withMessage(
      "Must contain at least 1 uppercase, 1 lowercase and 1 special character"
    )
    .isLength({ min: MIN_LEN_PASS, max: MAX_LEN_PASS })
    .withMessage(`Minimum length is ${MIN_LEN_PASS}`)
    .custom((val: string, { req }) => {
      if (val !== req.body.password) throw new Error("Passwords don't match");
      return true;
    }),
];

export const loginValidation = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isString()
    .withMessage("Must be a string")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Must be a string"),
];
