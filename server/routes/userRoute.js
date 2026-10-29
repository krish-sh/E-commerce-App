import express from "express";
import {
  login,
  register,
  logout,
  getProfile,
} from "../controllers/userController.js";
import tokenVerify from "../middleware/verifyToken.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

const middlewareRoute = express.Router();

middlewareRoute.get("/", tokenVerify, getProfile);

export { userRoute, middlewareRoute };
