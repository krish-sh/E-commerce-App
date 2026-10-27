import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/mongoConnection.js";
import ApiHandler from "./middleware/errorHanlder.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(ApiHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
