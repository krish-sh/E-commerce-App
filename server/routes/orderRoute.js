import express from "express";
import tokenVerify from "../middleware/verifyToken.js";
import {
  allOrderAdmin,
  orderHistory,
  placeOrder,
  updateStatus,
} from "../controllers/orderController.js";
import isAdmin from "../middleware/isAdmin.js";

const orderRoute = express.Router();

orderRoute.post("/place", tokenVerify, placeOrder);
orderRoute.get("/history", tokenVerify, orderHistory);
orderRoute.get("/admin/allOrders", tokenVerify, isAdmin, allOrderAdmin);
orderRoute.patch("/admin/:id", tokenVerify, isAdmin, updateStatus);

export default orderRoute;
