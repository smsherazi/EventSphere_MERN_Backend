    import mongoose from 'mongoose'

    const event = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        venue: {
            type: String,
            required: true
        },
        organizer_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "UserDetails",
            required: true
        },
        max_seats: {
            type: Number,
            required: true
        },
        seats_booked: {
            type: Number,
            default: 0
        },
        waitlist:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
        banner_url: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending","approved"],
            default: "pending"
        },

    }, {timestamps: true});

    const Event = mongoose.model("Events",event);

    export default Event;