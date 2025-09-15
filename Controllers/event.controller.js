import Event from "../Models/event.model.js";
import imagekit from "../Helpers/imageKit.js";

export const Events = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const EventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId).populate("organizer_id");
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const CreateEvent = async (req, res) => {
    try {
        let banner_url = "";
        if (req.file) {
            // Upload file to ImageKit
            const response = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname
            });
            banner_url = response.url;
        }

        const { title, desc, category, date, time, venue, max_seats, organizer_id } = req.body;

        const newEvent = new Event({
            title,
            desc,
            category,
            date,
            time,
            venue,
            organizer_id,
            max_seats,
            banner_url
        });

        await newEvent.save();
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });
    } catch (error) {
        console.error("CreateEvent error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const UpdateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, desc, category, date, time, venue, max_seats, banner_url,organizer_id } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        event.title = title;
        event.desc = desc;
        event.category = category;
        event.date = date;
        event.time = time;
        event.venue = venue;
        event.max_seats = max_seats;
        event.banner_url = banner_url;
        event.organizer_id = organizer_id;

        await event.save();
        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const DeleteEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        // Option 1: Find and delete in one step
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const PendingEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: "pending" }).populate("organizer_id");
        console.log(events);

        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const ApproveEvent = async (req, res) => {
    const eventId = req.params.id;
    console.log(eventId);

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        event.status = "approved";
        await event.save();
        console.log(event);

        res.status(200).json({
            success: true,
            message: "Event approved successfully",
        });
    } catch (error) {
        console.log("error", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



