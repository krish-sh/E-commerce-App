import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "Price cannot be in negative"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      min: [0, "Price cannot be in negative"],
      default: 0,
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
