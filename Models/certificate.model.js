import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
  participant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  url: { type: String, required: true },
  issued_on: { type: Date, default: Date.now }
}, { timestamps: true });

const Certificate = mongoose.model("Certificates", certificateSchema);

export default Certificate;
