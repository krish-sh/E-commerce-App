import cartModel from "../models/cartModel.js";
import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/ProductModel.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

const placeOrder = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(400, "First Logged In");
  }

  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      const cart = await cartModel.findOne({ user: userId }).session(session);

      if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
      }

      let totalAmount = 0;
      let items = [];

      for (const cartItem of cart.items) {
        const qty = cartItem.quantity;

        const product = await ProductModel.findOneAndUpdate(
          {
            _id: cartItem.product,
            quantity: { $gte: qty },
          },
          { $inc: { quantity: -qty } },
          { new: true, session },
        );

        if (!product) {
          throw new ApiError(
            400,
            "Product in your cart it has insufficent stock",
          );
        }

        totalAmount += product.price * qty;
        items.push({
          productId: product._id,
          quantity: qty,
          price: product.price,
        });
      }
      const [createOrder] = await OrderModel.create(
        [{ user: userId, items, totalAmount, status: "pending" }],
        { session },
      );

      order = createOrder;

      await cartModel.updateOne(
        { _id: cart._id },
        { $set: { items: [] } },
        { session },
      );
    });
  } finally {
    await session.endSession();
  }

  return res.status(200).json({
    success: true,
    message: "Order Placed successfully",
    order,
  });
};

const orderHistory = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(400, "Please logiin");
  }

  const history = await OrderModel.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("items.productId", "name image price");
  if (!history) {
    throw new ApiError(404, "Order hostory not found");
  }

  res.status(200).json({
    success: true,
    message: "order history",
    history,
  });
};

export { placeOrder, orderHistory };
