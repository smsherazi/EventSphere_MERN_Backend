import express from "express";
import { 
    Events, 
    EventById, 
    CreateEvent, 
    UpdateEvent, 
    DeleteEvent, 
    ApproveEvent, 
    PendingEvents
} from "../Controllers/event.controller.js";
import { authVerify } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";


const eventRouter = express.Router();

// ✅ Get all events
eventRouter.get("/api/events", Events);

// ✅ Get event by ID
eventRouter.get("/api/events/:id", EventById);

// ✅ Create new event (only logged-in organizer)
eventRouter.post("/api/event/add", authVerify, upload.single("banner"), CreateEvent);

eventRouter.get("/api/pendingEvents", authVerify, PendingEvents);

// ✅ Update event by ID (only logged-in organizer or admin)
eventRouter.put("/api/events/:id", authVerify, UpdateEvent);

// ✅ Delete event by ID (only logged-in organizer or admin)
eventRouter.delete("/api/events/:id", authVerify, DeleteEvent);

// ✅ Approve event (only admin)
eventRouter.put("/api/events/:id/approve", authVerify, ApproveEvent);

export default eventRouter;
