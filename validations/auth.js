import { body } from "express-validator";

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
