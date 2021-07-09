import mongoose from "mongoose";
import User from "./User";
/**
 * Activation Request Collection Schema
 */

const ActivationRequestSchema = new mongoose.Schema({
  state: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Request should belong to a user"],
    ref: "User",
  },
});

export default mongoose.models.ActivationRequest ||
  mongoose.model("ActivationRequest", ActivationRequestSchema);
