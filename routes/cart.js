import express from "express";
import { createCart, getCarts } from "../controllers/cartController.js";

const router = express.Router();
router.post("/", createCart);
router.get("/", getCarts);

export default router;
