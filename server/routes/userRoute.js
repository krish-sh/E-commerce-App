import express from "express";
import {
  login,
  register,
  logout,
  getProfile,
} from "../controllers/userController.js";
import tokenVerify from "../middleware/verifyToken.js";
import { loginSchema, registerSchema } from "../validator/auth.schema.js";
import { validator } from "../middleware/validator.js";

const userRoute = express.Router();

userRoute.post("/register", validator(registerSchema), register);
userRoute.post("/login", validator(loginSchema), login);
userRoute.post("/logout", logout);

const middlewareRoute = express.Router();

middlewareRoute.get("/", tokenVerify, getProfile);

export { userRoute, middlewareRoute };
