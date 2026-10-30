import ProductModel from "../models/ProductModel.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

const addProducts = async (req, res) => {
  const { name, description, price, category, quantity, image } = req.body;
  if (!name || !description || !price || !category || !quantity || !image) {
    throw new ApiError(400, "Please provide all the feilds");
  }

  const product = await ProductModel.create({
    name,
    description,
    price,
    quantity,
    category,
    image,
  });

  res.status(200).json({
    success: true,
    message: "Product added successfully",
    product,
  });
};

const editProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid product id");
  }

  const update = await ProductModel.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!update) {
    throw new ApiError(404, "Product id is not found");
  }

  res.status(200).json({
    success: true,
    message: "Product is successfully updated",
    product: update,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id");
  }

  const deleteProduct = await ProductModel.findByIdAndDelete(id);
  if (!deleteProduct) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({ success: true, message: "deleted successfully" });
};

export { addProducts, editProduct, deleteProduct };
