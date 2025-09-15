import express from "express";
import { 
    Registration, 
    GetRegistrations, 
    GetRegistrationById, 
    CancelRegistration, 
    UpdateRegistrationStatus 
} from "../Controllers/registration.controller.js";
import { authVerify } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Register a participant to an event
router.post("/api/registration/add",authVerify, Registration);

// ✅ Get all registrations
router.get("/api/registration",authVerify, GetRegistrations);

// ✅ Get registration by ID
router.get("/api/registration/:id",authVerify, GetRegistrationById);

// ✅ Cancel a registration
router.delete("/api/registration/:id",authVerify, CancelRegistration);

// ✅ Update registration status (approved/rejected/pending)
router.put("/api/registration/:id/status",authVerify, UpdateRegistrationStatus);

export default router;
