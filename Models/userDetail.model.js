import mongoose from "mongoose";


const userDetailsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  name: { type: String, required: true },
  dept: { type: String, required: true},
  enrollment_no: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  skills: [{ type: String }]
}, { timestamps: true });

const userDetail =  mongoose.model("UserDetails", userDetailsSchema);

export default userDetail;  