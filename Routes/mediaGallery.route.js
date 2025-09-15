import express from "express";
import { 
    AddMedia, 
    GetMedia, 
    GetMediaById, 
    UpdateMedia, 
    DeleteMedia 
} from "../Controllers/mediaGallery.controller.js";
import { authVerify } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

// ✅ Add Media
router.post("/api/media-gallery/add", authVerify, upload.array("files", 10), AddMedia);

// ✅ Get All Media
router.get("/api/media-gallery", GetMedia);

// ✅ Get Media by ID
router.get("/api/media-gallery/:id",authVerify, GetMediaById);

// ✅ Update Media  
router.put("/api/media-gallery/:id",authVerify, UpdateMedia);

// ✅ Delete Media
router.delete("/api/media-gallery/:id",authVerify, DeleteMedia);

export default router;
