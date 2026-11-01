import express from "express";
import {
  addItem,
  getCart,
  removeItem,
  updateQuantity,
} from "../controllers/cartController.js";
import tokenVerify from "../middleware/verifyToken.js";

const cartRouter = express.Router();

cartRouter.post("/add-item", tokenVerify, addItem);
cartRouter.post("/update-quantity", tokenVerify, updateQuantity);
cartRouter.post("/", tokenVerify, getCart);
cartRouter.post("/delete-product/:id", tokenVerify, removeItem);

export default cartRouter;
