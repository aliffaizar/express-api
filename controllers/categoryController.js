import expressAsyncHandler from "express-async-handler";
import Category from "../models/Category.js";

//@description  get all categories
//@route        GET /categories
//@access       Public
export const getCategories = expressAsyncHandler(async (req, res) => {
	const categories = await Category.find();
	if (categories.length === 0) {
		res.status(404);
		throw new Error("Category empty");
	}
	res.status(200).json(categories);
});

//@description  get category
//@route        GET /categories/:id
//@access       Public
export const getCategory = expressAsyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (!category) {
		res.status(404);
		throw new Error("Category not found");
	}
	res.status(200).json(category);
});

//@description  create category
//@route        POST /categories
//@access       Private
export const createCategory = expressAsyncHandler(async (req, res) => {
	const { name, description, imageUrl } = req.body;
	if (!name) {
		res.status(400);
		throw new Error("Name should not be emty");
	}
	const categoryExist = await Category.findOne({ name });
	if (categoryExist) {
		res.status(400);
		throw new Error("Category already exists");
	}
	const category = await Category.create({
		name,
		description,
		imageUrl,
	});
	res.status(201).json(category);
});

//@description  Upadte or edit category
//@route        PUT /categories/:id
//@access       Private
export const updateCategory = expressAsyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (!category) {
		res.status(404);
		throw new Error("Category not found");
	}
	const { name, description, imageUrl } = req.body;
	Object.assign(category, { name, description, imageUrl });
	await category.save();
	res.status(201).json(category);
});
//@description  Delete category
//@route        DELETE /categories/:id
//@access       Provate
export const delateCategory = expressAsyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (!category) {
		res.status(404);
		throw new Error("Category not found");
	}
	await category.remove();
	res.status(200).json(category);
});
