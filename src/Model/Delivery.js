import mongoose from "mongoose";
import User from "./User";
import Transection from "./Transection";

/**
 * Delivery Collection Schema
 */

const deliverySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [50, "Max Character in title is 50"],
  },
  description: {
    type: String,
    required: [true, "short Description is required"],
    maxLength: [400, "Max character in short description is 400"],
  },
  pickupLocation: {
    //GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      address: String,
      description: String,
      required: true,
    },
  },
  dipartureLocation: {
    //GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      address: String,
      required: true,
    },
  },
  reciver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Reciver is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required"],
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fromProductSnap: { // snap while taking product
    type: String,
    required: [true, "fromProductSnap Description required"],
  },
  viaProductSnap: { // snap while delivering product
    type: String,
  },
  toProductSnap: { // snap after successfull delivery of product
    type: String,
  },
  status: {
    type: String,
    enum: ["unassigned", "assigned", "dispached", "recived"],
    default: "unassigned",
  },
  transections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transection'
  }], // transection ids of delivery

});

deliverySchema.index({ owner: 1, deliveryPerson: 1 });

export default mongoose.models.Delivery ||
  mongoose.model("Delivery", deliverySchema);
