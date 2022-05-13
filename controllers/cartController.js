import expressAsyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";

//@description  create cart
//@route        POST /carts
//@access       Private
export const createCart = expressAsyncHandler(async (req, res) => {
	const cart = await Cart.create(req.body);
	res.status(201).json(cart);
});

//@description  get all carts
//@route        GET /carts
//@access       Public
export const getCarts = expressAsyncHandler(async (req, res) => {
	const carts = await Cart.find()
		.populate({ path: "items.product", select: "name price" })
		.populate({ path: "user", select: "name" });
	res.status(200).json(carts);
});

//@description  delete cart
//@route        DELETE /carts/:_id
//@access
