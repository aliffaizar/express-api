import mongoose from "mongoose";

const DB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`Database connected to ${connect.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
export default DB;
