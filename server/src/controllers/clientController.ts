//?external module
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
// import product from "../models/product";
import Client from "../models/client";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { formater } from "../utils/errorFormatter";

dotenv.config();

//*register client
export const registerClient = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const errors = validationResult(req).formatWith(formater);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.mapped());
  }
  try {
    const newPassword = await bcrypt.hash(password, 10);
    const client = new Client({
      name,
      email,
      password: newPassword,
      token: "",
    });
    const token = jwt.sign(
      { _id: client._id },
      process.env.SECRET_KEY as Secret
    );
    client.token = token;
    const result = await client.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error, "get all client");
    res.status(404).json(error);
  }
};

//*login client
export const loginClient = async (req: Request, res: Response) => {
  const { email } = req.body;
  const errors = validationResult(req).formatWith(formater);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.mapped());
  }
  try {
    const client = await Client.findOne({ email });
    res.cookie("jwt", client.token);
    res.status(200).json({ client });
  } catch (error) {
    console.log(error, "get all client");
    res.status(404).json(error);
  }
};

//*get all clients
export const getAllClient = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.log(error, "get all client");
    res.status(404).json(error);
  }
};

//* get individual client
export const getSingularClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    res.status(200).json(client);
  } catch (error) {
    console.log(error, "get Singular client");
    res.status(404).json(error);
  }
};
