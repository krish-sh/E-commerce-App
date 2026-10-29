import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

const tokenVerify =  (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Not logged in");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Error in verify token");
  }
  next();
};

export default tokenVerify;
