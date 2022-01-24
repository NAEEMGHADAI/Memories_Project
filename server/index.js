import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

//localhost:5000/posts

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
// const CONNECTION_URL =
// 	"mongodb+srv://Naeem:Raziya1234@cluster0.uznvb.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`Server Running on ${PORT}`)))
	.catch((err) => console.log(err.message));
