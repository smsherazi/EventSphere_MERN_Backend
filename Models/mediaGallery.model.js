import mongoose from "mongoose";

const mediaGallerySchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
  file_type: { type: String, enum: ["image", "video"], required: true },
  url: { type: String, required: true },
  uploaded_on: { type: Date, default: Date.now }
}, { timestamps: true });

const MediaGallery = mongoose.model("MediaGalleries", mediaGallerySchema);

export default MediaGallery;