import cartModel from "../models/cartModel.js";
import ProductModel from "../models/ProductModel.js";
import { ApiError } from "../utils/apiError.js";

const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new ApiError(400, "Invalid Product Id");
  }
  if (product.quantity <= 0) {
    throw new ApiError(400, "Out of stock");
  }

  let cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    cart = new cartModel({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  const newQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (newQuantity > product.quantity) {
    throw new ApiError(400, `Only ${product.quantity} is left in stock `);
  }

  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  await cart.populate("items.product");

  const items = cart.items.filter((item) => item.product);
  const total = items.reduce(
    (sum, items) => sum + items.product.price * items.quantity,
    0,
  );

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    total,
    items,
  });
};

const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find((i) => i.product.toString() === productId);

  if (!item) {
    throw new ApiError(404, "product not found in the cart");
  }

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new ApiError(400, "product not longer exist");
  }
  if (quantity > product.quantity) {
    throw new ApiError(400, `Only ${product.quantity} is left in the stock`);
  }

  item.quantity = quantity;

  await cart.save();
  await cart.populate("items.product");

  const items = cart.items.filter((i) => i.product);
  const total = items.reduce((sum, i) => sum + i.product.price * quantity, 0);

  res.status(200).json({
    success: true,
    message: "Quantity updated in cart",
    total,
    items,
  });
};

const getCart = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(400, "user id not found");
  }

  const cart = await cartModel
    .findOne({ user: userId })
    .populate("items.product");

  if (!cart) {
    res.status(200).json({
      success: true,
      message: "cart is empty",
      items: [],
      totalItem: 0,
      total: 0,
    });
  }

  const items = cart.items.filter((i) => i.product);
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  res.status(200).json({
    success: true,
    total,
    totalItems,
    items,
  });
};

const removeItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) {
    throw new ApiError(404, "Item not foud");
  }

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);

  await cart.save();
  await cart.populate("items.product");

  const items = cart.items.filter((i) => i.product);
  const total = items.reduce((sum, i) => sum + i.product.price * quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    total,
    totalItems,
    items,
  });
};

export { addItem, updateQuantity, getCart, removeItem };
