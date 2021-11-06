//?external module
import express from "express";

//?constants
const router = express.Router();

router.get("/");
router.get("/:id");
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;