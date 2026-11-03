import express from "express";
import tokenVerify from "../middleware/verifyToken.js";
import { orderHistory, placeOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", tokenVerify, placeOrder);
orderRoute.post("/history", tokenVerify, orderHistory)

export default orderRoute;
