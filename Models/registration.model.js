import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
  participant_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetails",required: true},
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  registered_on: { type: Date, default: Date.now },
  qr_code: { type: String } // ✅ student-specific QR store hoga
});

const Registration = mongoose.model("Registrations", registrationSchema);

export default Registration;


