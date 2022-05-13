import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
	{
		name: { type: String, required: [true, "Name should not be emty!"] },
		description: { type: String },
		imageUrl: { type: String },
	},
	{ timestamps: true, versionKey: false }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
