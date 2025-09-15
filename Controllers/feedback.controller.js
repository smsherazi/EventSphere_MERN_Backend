import Feedback from "../Models/feedback.model.js";

const SubmitFeedback = async (req, res) => {
    const { eventId, participantId, rating, comment } = req.body;
    try {   
        const feedback = new Feedback({
            event_id: eventId,
            participant_id: participantId,
            rating,
            comment
        });
        await feedback.save();
        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            data: feedback
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { SubmitFeedback };

const GetFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('participant_id').populate('event_id');
        res.status(200).json({
            success: true,
            data: feedbacks
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { GetFeedbacks };

const GetFeedbackById = async (req, res) => {
    const feedbackId = req.params.id;
    try {
        const feedback = await Feedback.findById(feedbackId).populate('participant_id').populate('event_id');
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }   
        res.status(200).json({
            success: true,
            data: feedback
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { GetFeedbackById };

const UpdateFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    const { rating, comment } = req.body;
    try {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }
        if (rating) feedback.rating = rating;
        if (comment) feedback.comment = comment;
        await feedback.save();
        res.status(200).json({ 
            success: true,
            message: "Feedback updated successfully",
            data: feedback 
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }   
}
export { UpdateFeedback };

const DeleteFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    try {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }
        await feedback.remove();
        res.status(200).json({
            success: true,
            message: "Feedback deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { DeleteFeedback };  

