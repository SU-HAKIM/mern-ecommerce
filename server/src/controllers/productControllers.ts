//?external modules
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Product from "../models/product";
import { formater } from "../utils/errorFormatter";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

export const getIndProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "there is no product of this id" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, image, price, available } = req.body;
  const errors = validationResult(req).formatWith(formater);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.mapped());
  }
  try {
    const product = new Product({
      title,
      description,
      image,
      price,
      available,
    });
    const result = await product.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const newProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
