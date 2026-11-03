import express from "express";
import tokenVerify from "../middleware/verifyToken.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", tokenVerify, placeOrder);

export default orderRoute;
