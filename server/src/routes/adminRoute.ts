//?external module
import express from "express";
import {
  createAdmin,
  loginAdmin,
  updateAdmin,
} from "../controllers/adminController";
import {
  createAdminValidator,
  loginAdminValidator,
} from "../middlewares/validateAdmin";

//?constants
const router = express.Router();

router.patch("/:id", updateAdmin);
router.post("/login", loginAdminValidator, loginAdmin);
router.post("/register", createAdminValidator, createAdmin);

export default router;
