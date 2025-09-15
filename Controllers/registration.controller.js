import RegistrationModel from '../Models/registration.model.js';
import Event from '../Models/event.model.js';

const Registration = async (req, res) => {
   try {
    const { userId, eventId } = req.body;

    // 1️⃣ Event fetch karo
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // 2️⃣ Check karo kya user already registered hai
    const alreadyRegistered = await RegistrationModel.findOne({
      event_id: eventId,
      participant_id: userId,
    });
    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event",
      });
    }

    // 3️⃣ Agar seats available hain → Confirm registration
    if (event.seats_booked < event.max_seats) {
      const registration = new RegistrationModel({
        event_id: eventId,
        participant_id: userId,
        status: "confirmed",
        qr_code: `${eventId}-${userId}`
      });

      await registration.save();

      // Event ke seats_booked update karo
      event.seats_booked += 1;
      await event.save();

      return res.status(201).json({
        success: true,
        message: "Registration confirmed 🎉",
        data: registration,
      });
    }

    // 4️⃣ Agar seats full hain → Waitlist me dal do
    if (!event.waitlist.includes(userId)) {
      event.waitlist.push(userId);
      await event.save();
    }

    return res.status(200).json({
      success: true,
      message: "Event is full. You have been added to the waitlist.",
      data: event.waitlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export { Registration };


const GetRegistrations = async (req, res) => {
    try {
        const registrations = await RegistrationModel.find().populate('participant_id').populate('event_id');
        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }   
}

export  { GetRegistrations };


const GetRegistrationById = async (req, res) => {
    const registrationId = req.params.id;
    try {
        const registration = await RegistrationModel.findById(registrationId).populate('participant_id').populate('event_id');
        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }
        res.status(200).json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export  { GetRegistrationById };


const CancelRegistration = async (req, res) => {
    const registrationId = req.params.id;
    try {
        const registration = await RegistrationModel.findById(registrationId);
        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }
        await registration.remove();
        res.status(200).json({
            success: true,
            message: "Registration cancelled successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { CancelRegistration };


const UpdateRegistrationStatus = async (req, res) => {
    const registrationId = req.params.id;
    const { status } = req.body;    
    try {
        const registration = await RegistrationModel.findById(registrationId);
        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }
        registration.status = status;
        await registration.save();
        res.status(200).json({
            success: true,
            message: "Registration status updated successfully",
            data: registration
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { UpdateRegistrationStatus };

