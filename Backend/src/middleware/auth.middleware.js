import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization");

    if (!token)
      return res.json({
        success: false,
        message: "Unauthorized request!",
      });

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken?._id).select("-Password");

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid AccessToken!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
