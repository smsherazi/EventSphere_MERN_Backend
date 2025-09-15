import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
  participant_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetails", required: true },
  attended: { type: Boolean, default: false }
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
