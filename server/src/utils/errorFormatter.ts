import { ValidationError } from "express-validator";

export const formater = (error: ValidationError) => error.msg;
