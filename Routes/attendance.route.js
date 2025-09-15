import express from "express";
import { 
    MarkAttendance, 
    GetAttendance, 
    GetAttendanceById, 
    UpdateAttendance, 
    DeleteAttendance 
} from "../Controllers/attendance.controller.js";
import { authVerify } from "../Middlewares/auth.middleware.js";

const attendanceRouter = express.Router();

// ✅ Mark attendance (participant ke liye / admin bhi kar sakta hai)
attendanceRouter.post("/api/attendance", authVerify, MarkAttendance);

// ✅ Get all attendance records (admin only)
attendanceRouter.get("/api/attendance", authVerify, GetAttendance);

// ✅ Get specific attendance record by ID
attendanceRouter.get("/api/attendance/:id", authVerify, GetAttendanceById);

// ✅ Update attendance record by ID
attendanceRouter.put("/api/attendance/:id", authVerify, UpdateAttendance);

// ✅ Delete attendance record by ID
attendanceRouter.delete("/api/attendance/:id", authVerify, DeleteAttendance);

export default attendanceRouter;
