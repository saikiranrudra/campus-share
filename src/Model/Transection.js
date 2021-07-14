/**
 * 1. sender
 * 2. reciver
 * 3. Amount
 * 4. type: reward, payment, refund
 */
import mongoose from "mongoose";
import User from "./User";

const transectionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender is required"],
  },
  reciver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Reciver is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  paymentType: {
    type: String,
    enum: ["reward", "payment", "refund"],
    required: [true, "payment type is required"],
  },
  paymentId: {
    type: String,
    required: [true, "PaymentId is required"],
  },
});

export default mongoose.models.Transection ||
  mongoose.model("Transection", transectionSchema);
