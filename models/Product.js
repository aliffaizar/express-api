import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name should not be empty"],
		},
		description: { type: String },
		price: { type: Number, required: [true, "Price should not be empty"] },
		imageUrl: { type: String },
		category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	},
	{ timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
