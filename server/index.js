import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/mongoConnection.js";
import ApiHandler from "./middleware/errorHanlder.js";
import healthRoute from "./routes/healthRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoute);
app.use("/api/healthRoute", healthRoute);

app.use(ApiHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
