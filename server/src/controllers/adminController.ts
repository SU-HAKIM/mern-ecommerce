//?external modules
import { Request, Response } from "express";
import Admin from "../models/admin";
import bcrypt from "bcrypt";
import { formater } from "../utils/errorFormatter";
import { validationResult } from "express-validator";

export const loginAdmin = async (req: Request, res: Response) => {
  const { adminKey } = req.body;
  const errors = validationResult(req).formatWith(formater);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.mapped());
  }
  try {
    const admin = await Admin.findOne({ adminKey });
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { name, adminKey, password } = req.body;
  const errors = validationResult(req).formatWith(formater);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.mapped());
  }
  try {
    const newPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, adminKey, password: newPassword });
    res.status(201).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const newAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(newAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
