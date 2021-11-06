//?external module
import express from "express";
import {
  getAllClient,
  getSingularClient,
  loginClient,
  registerClient,
} from "../controllers/clientController";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validateClient";

//?constants
const router = express.Router();

router.get("/", getAllClient);
router.get("/:id", getSingularClient);
router.post("/login", loginValidator, loginClient);
router.post("/register", registerValidator, registerClient);

export default router;
