import { ApiError } from "../utils/apiError";


const isAdmin = (req, res, next) => {
  const role = req.user?.role;

  if (role !== "admin") {
    throw new ApiError(403, "This page is only for admin");
  }
  next();
};

export default isAdmin;
