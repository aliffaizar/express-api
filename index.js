import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import categoryRoutes from "./routes/category.js";
dotenv.config();
DB();

const App = express();
App.use(cors());
App.use(express.json());

App.use("/users", userRoutes);
App.use("/products", productRoutes);
App.use("/categories", categoryRoutes);
App.use("/carts", cartRoutes);

App.use(errorHandler);
App.use((req, res) => {
	res.status(404);
	throw new Error("Error 404");
});
App.listen(process.env.PORT, () =>
	console.log(`Server running at port: ${process.env.PORT}`)
);
