const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required!"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email Provided is Invalid"]
  },
  avatar: {
    type: String,
    required: [true, "Your Photo is required"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Enter your Password"],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    validate: {
      // This only works on create and save
      validator: function(el) {
        return el === this.password
      },
      message: "password is not same"
    }
  },
  college: {
    type: String,
    required: [true, "College name is required"]
  },
  collegeId: {
    type: String,
    required: [true, "College Id is required"]
  },
  adhaarId: {
    type: String,
    required: [true, "Adhaar Id is required"]
  },
  adhaarNumber: Number,
  collegeEnrollmentNumber: Number,
  proofImage: String,
  proofVideo: String,
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.index({ email: 1 }, { unique: true })

userSchema.virtual('firstName').get(function() {
  return this.fullName.split(' ')[0]
})

userSchema.virtual('lastName').get(function() {
  return this.fullName.split(' ')[1]
})

export default mongoose.models.User || mongoose.model('User', userSchema)