import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";

//@description  get all products
//@route        GET /products
//@access       Public
export const getProducts = expressAsyncHandler(async (req, res) => {
	const products = await Product.find().populate({
		path: "category",
		select: "name",
	});
	if (products.length === 0) {
		res.status(404);
		throw new Error("Products empty");
	} else {
		res.status(200).json(products);
	}
});

//@deacription  get single Products
//@route        GET /prpducts/:id
//@access       Public
export const getProduct = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id).populate({
		path: "category",
		select: "name",
	});
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}
	res.status(200).json(product);
});

//@description  create product
//@route        POST /products
//@access       Private
export const createProduct = expressAsyncHandler(async (req, res) => {
	const { name, description, price, category, imageUrl } = req.body;
	if (!name) {
		res.status(400);
		throw new Error("Name should not be empty!");
	}
	if (!price) {
		res.status(400);
		throw new Error("Price should not be empty");
	}
	const productExist = await Product.findOne({ name });
	if (productExist) {
		res.status(400);
		throw new Error("Product already exists");
	}
	const product = await Product.create({
		name,
		description,
		price,
		imageUrl,
		category,
	});
	const newProduct = await Product.findOne({ name }).populate({
		path: "category",
		select: "name",
	});
	res.status(201).json(newProduct);
});

//@description  edit or update product
//@route        PUT /products/:id
//@access       Private
export const updateProduct = expressAsyncHandler(async (req, res) => {
	const { name, description, price, category, imageUrl } = req.body;
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}
	const updateProduct = await Product.findByIdAndUpdate(
		req.params.id,
		{ name, description, price, imageUrl, category },
		{ new: true }
	);
	res.status(201).json(updateProduct);
});

//@description  edit or update product
//@route        DELETE /products/:id
//@access       Private
export const deleteProduct = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}
	await product.remove();
	res.status(200).json(product);
});
