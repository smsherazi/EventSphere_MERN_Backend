import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
  participant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Feedback = mongoose.model("Feedbacks", feedbackSchema);

export default Feedback;