import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model("Message", messageSchema);
