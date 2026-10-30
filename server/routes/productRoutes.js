import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import { addProducts } from "../controllers/productController.js";
import tokenVerify from "../middleware/verifyToken.js";

const product = express.Router();

product.post("/addProduct", tokenVerify, isAdmin, addProducts);

export default product;
