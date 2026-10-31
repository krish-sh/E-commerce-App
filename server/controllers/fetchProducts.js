import ProductModel from "../models/ProductModel.js";

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
    const escaped = req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

export { getAllProducts };
