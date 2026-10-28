import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Invalid credendial");
  }

  const IsUserExist = await UserModel.findOne({ email });
  if (IsUserExist) {
    throw new ApiError(409, "Email already exist");
  }

  const user = await UserModel.create({ name, email, password });

  const salt = await bcrypt.genSalt(12);
  const newPassword = await bcrypt.hash(password, salt);
  console.log(newPassword);

  return res.status(201).json({
    success: true,
    message: "User registered",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      password: newPassword,
      role: user.role,
    },
  });
};

const login = async () => {};

export { register, login };
