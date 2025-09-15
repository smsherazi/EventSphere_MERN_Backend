import Attendance from "../Models/attendance.model.js";

const MarkAttendance = async (req, res) => {
  const { eventId, participantId } = req.body;

  try {
    // 1️⃣ Check if already exists
    const existing = await Attendance.findOne({
      event_id: eventId,
      participant_id: participantId,
    });

    if (existing) {
      if (existing.attended) {
        return res.status(400).json({
          success: false,
          message: "⚠️ Attendance already marked for this participant",
        });
      }

      // agar record bana hai lekin attended false hai to update karo
      existing.attended = true;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: "✅ Attendance marked successfully",
        data: existing,
      });
    }

    // 2️⃣ Agar pehli dafa scan ho raha hai → new record
    const newAttendance = new Attendance({
      event_id: eventId,
      participant_id: participantId,
      attended: true,
    });

    await newAttendance.save();

    return res.status(201).json({
      success: true,
      message: "✅ Attendance marked successfully",
      data: newAttendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { MarkAttendance };


const GetAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('participant_id').populate('event_id');
        res.status(200).json({
            success: true,
            data: attendanceRecords
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { GetAttendance };

const GetAttendanceById = async (req, res) => {
    const attendanceId = req.params.id;
    try {
        const attendance = await Attendance.findById(attendanceId).populate('participant_id').populate('event_id');
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }
        res.status(200).json({
            success: true,
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { GetAttendanceById };

const UpdateAttendance = async (req, res) => {
    const attendanceId = req.params.id;
    const { attended } = req.body;
    try {
        const attendance = await Attendance.findById(attendanceId);
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }
        attendance.attended = attended;
        await attendance.save();
        res.status(200).json({
            success: true,
            message: "Attendance record updated successfully",
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { UpdateAttendance };

const DeleteAttendance = async (req, res) => {
    const attendanceId = req.params.id;
    try {
        const attendance = await Attendance.findByIdAndDelete(attendanceId);
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Attendance record deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { DeleteAttendance };



