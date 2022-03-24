import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.CONNECTION_USER}:${process.env.CONNECTION_PASS}@cluster0.bmscu.mongodb.net/test`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
  )
  .catch((err) => console.log(err));
