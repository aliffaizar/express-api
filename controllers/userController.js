import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Generate JWT Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
};

//@description  create user or regist user
//@route        POST /users/
//@access       Public
export const createUser = expressAsyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	// form validation
	if (!name) {
		res.status(400);
		throw new Error("Name should not be empty!");
	}
	if (!email) {
		res.status(400);
		throw new Error("Email should not be empty!");
	}
	if (!password) {
		res.status(400);
		throw new Error("Password should not be empty!");
	}
	// Check if user exists
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error("User already exists");
	}
	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassord = await bcrypt.hash(password, salt);

	// create user database
	const user = await User.create({
		name,
		email,
		password: hashedPassord,
	});
	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

//@description  Login user or authenticate a user
//@route        POST /users/login
//@access       Public
export const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//Check user email
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

//@description  Get user detail or get user prifile
//@route         GET /users/profile
//@access       Private
export const getUserProfile = expressAsyncHandler(async (req, res, next) => {
	res.status(200).json(req.user);
});
