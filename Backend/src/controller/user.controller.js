import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import moment from "moment";

const register = async (req, res) => {
  try {
    const existuser = await User.findOne({ Email: req.body.Email });

    if (existuser) {
      return res.json({
        success: false,
        message: "This email is already in use by another account!",
      });
    }

    await User.create(req.body);

    res.json({
      success: true,
      message: "Register Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.json({
        success: false,
        message: "All fields are required!",
      });
    }

    const user = await User.findOne({ Email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const password = await user.isPasswordCorrect(Password);

    if (!password) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = await user.genrateAccessToken();

    user.LastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "Login Successfully",
      accessToken,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getuser = async (req, res) => {
  try {
    const user = await User.aggregate([
      { $match: { _id: req.user._id } },
      {
        $addFields: {
          LastLogin: {
            $dateToString: {
              format: "%d-%m-%Y %H:%M:%S",
              date: "$LastLogin",
              timezone: "+05:30",
            },
          },
          DOB: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$DOB",
              timezone: "+05:30",
            },
          },
          JoiningDate: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$JoiningDate",
              timezone: "+05:30",
            },
          },
          createdAt: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
              timezone: "+05:30",
            },
          },
        },
      },
      {
        $project: {
          Password: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);

    return res.json({
      success: true,
      message: "user data featch successfully",
      data: user[0],
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const birthday = async (req, res) => {
  const date1 = moment().add(2, "days").format("DD-MM");
  const date2 = moment().format("DD-MM");
  try {
    const user = await User.aggregate([
      {
        $addFields: {
          D: {
            $dateToString: {
              format: "%d-%m",
              date: "$DOB",
              timezone: "+05:30",
            },
          },
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $gte: [date1, "$D"] }, { $lte: [date2, "$D"] }],
          },
        },
      },
      {
        $sort: {
          DOB: -1,
        },
      },
      {
        $project: {
          Password: 0,
          updatedAt: 0,
          __v: 0,
          D: 0,
        },
      },
    ]);

    return res.json({
      success: true,
      message: "user data featch successfully",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login, getuser, birthday };
