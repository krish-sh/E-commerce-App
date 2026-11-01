import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";

const getAllProducts = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;

  const sortOptions = {
    newest: { createdAt: -1, _id: -1 },
    oldest: { createdAt: 1, _id: 1 },
    priceLow: { price: 1, _id: 1 },
    priceHigh: { price: -1, _id: -1 },
  };

  const sort = sortOptions[req.query.sort] || sortOptions.newest;

  const filter = {};
  if (typeof req.query.category === "string" && req.query.category) {
    filter.category = req.query.category;
  }
  if (typeof req.query.search === "string" && req.query.search.trim()) {
    const escaped = req.query.search
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.name = { $regex: escaped, $options: "i" };
  }

  const [products, total] = await Promise.all([
    ProductModel.find(filter).sort(sort).skip(skip).limit(limit),
    ProductModel.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    products,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid product id");
  }

  const product = await ProductModel.findById(id);
  if (!product) {
    throw new ApiError(404, "Product cant found");
  }

  res.status(200).json({
    success: true,
    product,
  });
};

export { getAllProducts, getProductById };
