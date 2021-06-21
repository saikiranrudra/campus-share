import mongoose from "mongoose";
import validator from "validator";
import { compare, hash } from "bcrypt";

/**
 * User Collection Schema
 */
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email Provided is Invalid"],
  },
  avatar: {
    type: String,
    required: [true, "Your Photo is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Enter your Password"],
    select: false,
  },
  college: {
    type: String,
    required: [true, "College name is required"],
  },
  collegeId: {
    type: String,
    required: [true, "College Id is required"],
  },
  adhaarId: {
    type: String,
    required: [true, "Adhaar Id is required"],
  },
  adhaarNumber: Number,
  collegeEnrollmentNumber: Number,
  proofImage: String,
  proofVideo: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: false,
  },
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

/**
 * Indexing UserSchema
 */
userSchema.index({ email: 1 }, { unique: true });

/**
 * Executed every time user document is saved
 */
userSchema.pre("save", async function (next) {
  const password = await hash(this.password, 12);
  this.password = password;
  this.passwordChangedAt = Date.now();
  next();
});

/**
 * Virtual Properties
 */
userSchema.virtual("firstName").get(function () {
  return this.fullName.split(" ")[0];
});

userSchema.virtual("lastName").get(function () {
  return this.fullName.split(" ")[1];
});

/**
 * To Check weather a password plain text is equal to encrpyted text
 * @example
 * const User from "./models/User"
 * const isCorrect = await User.verifyPassword(plainTextPassword, encryptedPassword);
 * @param {String} candidatePassword - plain text password to compare
 * @param {String} userPassword - encrypted password
 * @returns {boolean}
 */
userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await compare(candidatePassword, userPassword);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
