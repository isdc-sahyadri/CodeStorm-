const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    preference: String, // vegetarian, speaker, etc.
    role: String // VIP, speaker, guest
});

module.exports = mongoose.model("Attendee", AttendeeSchema);
