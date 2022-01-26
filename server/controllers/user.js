import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if user exists
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({
				message: "User with this email does not exist",
			});
		}
		// Check if password is correct
		const isPasswordCorrect = await bycrpt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Incorrect password",
			});
		}
		// Create JWT Payload
		const token = jwt.sign(
			{ email: existingUser.email, userId: existingUser._id },
			"test",
			{ expiresIn: "1h" }
		);
		res.status(200).json({
			result: existingUser,
			token,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
		});
	}
};

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		// Check if user exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: "User with this email already exists",
			});
		}
		if (password !== confirmPassword) {
			return res.status(400).json({
				message: "Passwords do not match",
			});
		}
		const hashedPassword = await bycrpt.hash(password, 12);
		// Create new user
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, "test", {
			expiresIn: "1h",
		});
		res.status(200).json({
			result,
			token,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
		});
	}
};
