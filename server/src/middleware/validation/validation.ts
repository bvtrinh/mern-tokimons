import { body } from "express-validator";
export const tokiValidation = [
  body("name", "Invalid name")
    .exists()
    .isString()
    .isLength({ min: 1, max: 128 }),
  body("height", "Invalid height").exists().isInt({ min: 1 }),
  body("weight", "Invalid weight").exists().isInt({ min: 1 }),
  body("elements.electric", "Invalid Electric Level")
    .exists()
    .isInt({ min: 1, max: 100 }),
  body("elements.fly", "Invalid Fly Level")
    .exists()
    .isInt({ min: 1, max: 100 }),
  body("elements.fight", "Invalid Fight Level")
    .exists()
    .isInt({ min: 1, max: 100 }),
  body("elements.fire", "Invalid Fire Level")
    .exists()
    .isInt({ min: 1, max: 100 }),
  body("elements.ice", "Invalid Ice Level")
    .exists()
    .isInt({ min: 1, max: 100 }),
  body("elements.water", "Invalid Water Level")
    .exists()
    .isInt({ min: 1, max: 100 }),
];
