import express from "express";
import { getAllProducts } from "../controllers/fetchProducts.js";

const publicRouter = express.Router();

publicRouter.get("/", getAllProducts);

export default publicRouter;
