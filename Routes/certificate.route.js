import express from "express";
import { 
    IssueCertificate, 
    GetCertificates, 
    GetCertificateById, 
    DeleteCertificate 
} from "../Controllers/certificate.controller.js";
import { authVerify } from "../Middlewares/auth.middleware.js";

const certificateRouter = express.Router();

// ✅ Issue new certificate (admin/organizer only)
certificateRouter.post("/api/certificates", authVerify, IssueCertificate);

// ✅ Get all certificates (admin only)
certificateRouter.get("/api/certificates", authVerify, GetCertificates);

// ✅ Get certificate by ID
certificateRouter.get("/api/certificates/:id", authVerify, GetCertificateById);

// ✅ Delete certificate by ID (admin only)
certificateRouter.delete("/api/certificates/:id", authVerify, DeleteCertificate);

export default certificateRouter;
