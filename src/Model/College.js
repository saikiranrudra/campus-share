import mongoose from "mongoose";


/**
 * College Collection Schema
 */

const collegeSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, "State in which your college belong is required"]
  },
  district: {
    type: String,
    required: [true, "District in which your college belong is required"]
  },
  name: {
    type: String,
    required: [true, "College name is required"]
  },
  university: {
    type: String,
    required: [true, "University name is required"]
  },
  instituteType: {
    type: String,
    enum: ["government", "government-aid", "private-self-financed", "state-government"],
    default: "private-self-financed"
  }}
  , { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

/**
 * Indexing CollegeSchema
 */
collegeSchema.index({ name: 1 }, {unique: true});

export default mongoose.models.College || mongoose.model("College", collegeSchema);
