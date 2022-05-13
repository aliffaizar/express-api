import express from "express";
import auth from "../middleware/auth.js";
import {
	createCategory,
	delateCategory,
	getCategories,
	getCategory,
	updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", auth, createCategory);
router.get("/:id", getCategory);
router.put("/:id", auth, updateCategory);
router.delete("/:id", auth, delateCategory);

export default router;
