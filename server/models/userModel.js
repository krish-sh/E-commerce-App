import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: [3, "Name must be longer than the 3 Characters"],
      maxLength: [60, "Name cannot be exceed to 60 Character"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "this email already used for create a account"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [9, "Password cannot be less than 9 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
