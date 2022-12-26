import { body } from "express-validator";

export const registerValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Password can be minimum 5 letter").isLength({ min: 5 }),
  body("fullName", "Name need be minimum 5 letter").isLength({ min: 3 }),
  body("avatarUrl", "Wrong link on avatar").optional().isURL(),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Add header to post").isLength({ min: 3 }).isString(),
  body("text", "Add text  to article").isLength({ min: 3 }).isString(),
  body("tags", "Wrong format tags (write array)").optional().isString(),
  body("avatarUrl", "Wrong link image ").optional().isString(),
];
