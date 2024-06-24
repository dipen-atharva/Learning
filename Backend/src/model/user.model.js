import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    LastLogin: {
      type: Date,
      default: null,
    },
    DOB: {
      type: Date,
      required: true,
    },
    JoiningDate: {
      type: Date,
      required: true,
    },
    Active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  this.Password = await bcryptjs.hash(this.Password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (Password) {
  return await bcryptjs.compare(Password, this.Password);
};

userSchema.methods.genrateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const User = model("Usre", userSchema);
