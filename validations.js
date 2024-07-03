import { body } from "express-validator";

export const loginValidation = [
  body("email", "invalid email format").isEmail(),
  body("password", "password must contain at least 8 characters").isLength({
    min: 8,
  }),
];
export const registerValidation = [
  body("email", "invalid email format").isEmail(),
  body("password", "password must contain at least 8 characters").isLength({
    min: 8,
  }),
  body("fullName", "The name must contain at least 2 characters").isLength({
    min: 2,
  }),
  body("avatarURL", "Invalid URL format").optional().isURL(),
];

export const entityCreateValidation = [
  body("name", "Enter name").isString().isLength({
    min: 2,
  }),
  body("country", "Enter country").isString().isLength({
    min: 2,
  }),
  body("marketShare", "Enter your market share"),
  body("renewableEnergy", "Enter your renewable energy percent"),
  body("yearlyRevenue", "Enter your yearly revenue in euros"),
];
