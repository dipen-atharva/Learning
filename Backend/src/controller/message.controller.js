import mongoose from "mongoose";
import { Message } from "../model/message.model.js";

const send = async (req, res) => {
  try {
    const { senderID, receiverID, message } = req.body;

    if (!senderID || !receiverID || !message) {
      res.json({
        success: false,
        message: "All filed are required",
      });
    }

    const mes = await Message.create(req.body);

    res.json({
      success: true,
      message: "message send succsessfully",
      data: mes,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const mychat = async (req, res) => {
  try {
    console.log(ID1, ID2);
    const { ID1, ID2 } = req.params;
    console.log(ID1, ID2);

    const data = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { senderID: new mongoose.Types.ObjectId(ID1) },
                { receiverID: new mongoose.Types.ObjectId(ID2) },
              ],
            },
            {
              $and: [
                { senderID: new mongoose.Types.ObjectId(ID2) },
                { receiverID: new mongoose.Types.ObjectId(ID1) },
              ],
            },
          ],
        },
      },
      {
        $addFields: {
          isSender: {
            $cond: {
              if: { $eq: ["$senderID", new mongoose.Types.ObjectId(ID1)] },
              then: true,
              else: false,
            },
          },
          isUpdated: {
            $cond: {
              if: { $eq: ["$createdAt", "$updatedAt"] },
              then: false,
              else: true,
            },
          },
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Message featch successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const Inbox = async (req, res) => {
  try {
    const { ID } = req.params;

    const data = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderID: new mongoose.Types.ObjectId(ID) },
            { receiverID: new mongoose.Types.ObjectId(ID) },
          ],
        },
      },
      {
        $addFields: {
          sender: {
            $cond: {
              if: { $eq: ["$senderID", new mongoose.Types.ObjectId(ID)] },
              then: "$receiverID",
              else: "$senderID",
            },
          },
          createdAt: {
            $dateToString: {
              format: "%H:%M",
              date: "$createdAt",
              timezone: "+05:30",
            },
          },
        },
      },
      {
        $lookup: {
          from: "usres",
          localField: "sender",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $group: {
          _id: "$sender",
          message: { $first: "$message" },
          createdAt: { $first: "$createdAt" },
          Name: { $first: { $first: "$user.FullName" } },
        },
      },
    ]);
    res.json({
      success: true,
      message: "Message featch successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { send, mychat, Inbox };
