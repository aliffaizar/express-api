import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";

router.get("/", getProducts);
router.post("/", auth, createProduct);
router.get("/:id", getProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
