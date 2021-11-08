//?external module
import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getIndProduct,
  updateProduct,
} from "../controllers/productControllers";
import { createProductValidator } from "../middlewares/validateProduct";

//?constants
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getIndProduct);
router.post("/", createProductValidator, createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
