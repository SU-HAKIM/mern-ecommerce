//?external module
import { body } from "express-validator";
import Client from "../models/client";
import bcrypt from "bcrypt";

export const registerValidator = [
  body("name").not().isEmpty().withMessage("enter your full name"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("enter your email address")
    .isEmail()
    .withMessage("enter a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("enter password")
    .isLength({ min: 8, max: 16 })
    .withMessage("password must be between 8 to 16 chars"),
  body("cPassword")
    .not()
    .isEmpty()
    .withMessage("enter confirm password")
    .custom((cPassword, { req }) => {
      const isEqual = cPassword === req.body.password;
      console.log(req.body.password);
      if (!isEqual) {
        return Promise.reject("password must match");
      }
      return true;
    }),
];

export const loginValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("enter email address")
    .isEmail()
    .withMessage("enter a valid email address")
    .custom(async (email) => {
      const client = await Client.findOne({ email });
      if (!client) {
        return Promise.reject("invalid credentials");
      }
      return true;
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("enter password")
    .custom(async (password, { req }) => {
      const client = await Client.findOne({ email: req.body.email });
      if (!client) {
        return Promise.reject("invalid credentials");
      }
      const isRight = await bcrypt.compare(password, client.password);
      if (!isRight) {
        return Promise.reject("invalid credentials");
      }
      return true;
    }),
];
