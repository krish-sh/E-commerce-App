import ProductModel from "../models/ProductModel.js";
import { ApiError } from "../utils/apiError.js";

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
  const { productId } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid product id");
  }

  const update = await ProductModel.findByIdAndUpdate(
    productId,
    {
      $set: req.body,
    },
    {
      new: true,
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

const deleteProduct = async (req, res) => {};

export { addProducts , editProduct, deleteProduct};
