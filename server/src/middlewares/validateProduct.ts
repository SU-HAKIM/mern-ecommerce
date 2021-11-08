//?external modules
import { body } from "express-validator";

export const createProductValidator = [
  body("title").not().isEmpty().withMessage("enter product title"),
  body("description").not().isEmpty().withMessage("enter product description"),
  body("image").not().isEmpty().withMessage("upload a product photo"),
  body("price").not().isEmpty().withMessage("enter product price in taka"),
  body("available")
    .not()
    .isEmpty()
    .withMessage("enter the amount of available products"),
];
