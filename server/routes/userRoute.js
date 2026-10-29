import express from "express";
import { login, register, logout } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout)

export default userRoute;