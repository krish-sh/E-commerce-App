import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/fetchProducts.js";

const publicRouter = express.Router();

publicRouter.get("/", getAllProducts);
publicRouter.get("/:id", getProductById);

export default publicRouter;
