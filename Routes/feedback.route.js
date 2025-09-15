import express from "express";
import { 
    SubmitFeedback, 
    GetFeedbacks, 
    GetFeedbackById, 
    UpdateFeedback, 
    DeleteFeedback 
} from "../Controllers/feedback.controller.js";
import { authVerify } from "../Middlewares/auth.middleware.js";

const feedbackRouter = express.Router();

// ✅ Submit new feedback (participant only)
feedbackRouter.post("/api/feedbacks", authVerify, SubmitFeedback);

// ✅ Get all feedbacks (admin/organizer only)
feedbackRouter.get("/api/getfeedbacks", authVerify, GetFeedbacks);

// ✅ Get feedback by ID
feedbackRouter.get("/api/feedbacks/:id", authVerify, GetFeedbackById);

// ✅ Update feedback by ID (only feedback owner / admin)
feedbackRouter.put("/api/feedbacks/:id", authVerify, UpdateFeedback);

// ✅ Delete feedback by ID (only feedback owner / admin)
feedbackRouter.delete("/api/feedbacks/:id", authVerify, DeleteFeedback);

export default feedbackRouter;
