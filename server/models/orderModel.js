import mongoose, { mongo } from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      defualt: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [itemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: {
        value: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      },
      defualt: "pending",
    },
  },
  { timestamps: true },
);


const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default OrderModel