import mongoose from 'mongoose';

const user = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["participant", "organizer", "admin"]
    },
    isOrganizerReq: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const User = mongoose.model("Users",user);

export default User;