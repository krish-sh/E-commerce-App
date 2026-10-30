import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import { addProducts, deleteProduct, editProduct } from "../controllers/productController.js";
import tokenVerify from "../middleware/verifyToken.js";
import { validator } from "../middleware/validator.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validator/product.schema.js";

const product = express.Router();

product.post(
  "/addProduct",
  tokenVerify,
  isAdmin,
  validator(createProductSchema),
  addProducts,
);

product.patch(
  "/updateProduct/:id",
  tokenVerify,
  isAdmin,
  validator(updateProductSchema),
  editProduct,
);

product.delete("/deleteProduct/:id", tokenVerify, isAdmin, deleteProduct);

export default product;
