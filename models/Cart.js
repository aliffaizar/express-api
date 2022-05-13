import mongoose from "mongoose";

const cartShcema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User Should not be emty"],
		},
		items: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
				quantity: {
					type: Number,
					required: [true, "Quantity should not be empty"],
					min: [1, "Quantity should not less than 1"],
				},
				subTotal: {
					type: Number,
					required: [true, "SubTotal should not be empty"],
				},
			},
		],
		totalPrice: {
			type: Number,
			required: [true, "Total price shuld not be empty"],
		},
		totalPrice: {
			type: Number,
			required: [true, "Total quantity shuld not be empty"],
		},
	},
	{ timestamps: true, versionKey: false }
);
const Cart = mongoose.model("Cart", cartShcema);
export default Cart;
