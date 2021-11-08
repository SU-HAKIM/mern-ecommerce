//?external modules
import { body } from "express-validator";
import Admin from "../models/admin";
import bcrypt from "bcrypt";

export const createAdminValidator = [
  body("existingAdminKey")
    .not()
    .isEmpty()
    .withMessage("enter your admin key")
    .custom(async (adminKey) => {
      const admin = await Admin.findOne({ adminKey });
      if (!admin) {
        return Promise.reject("Only admin can create another admin");
      }
      return true;
    }),
  body("name").not().isEmpty().withMessage("enter admin name"),
  body("adminKey")
    .not()
    .isEmpty()
    .withMessage("enter a admin key")
    .isLength({ min: 8, max: 16 })
    .withMessage("admin key must be between 8 to 16 chars"),
  body("password").not().isEmpty().withMessage("enter admin password"),
];

export const loginAdminValidator = [
  body("adminKey")
    .not()
    .isEmpty()
    .withMessage("enter a admin key")
    .isLength({ min: 8, max: 16 })
    .withMessage("admin key must be between 8 to 16 chars")
    .custom(async (adminKey) => {
      const admin = await Admin.findOne({ adminKey });
      if (!admin) {
        return Promise.reject("Invalid Credentials!");
      }
      return true;
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("enter admin password")
    .custom(async (password, { req }) => {
      const admin = await Admin.findOne({ adminKey: req.body.adminKey });
      if (!admin) {
        return Promise.reject("Invalid Credentials!");
      }
      const isEqual = password === req.body.password;
      if (!isEqual) {
        return Promise.reject("Invalid Credentials!");
      }
      return true;
    }),
];
