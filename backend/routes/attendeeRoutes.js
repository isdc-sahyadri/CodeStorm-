const express = require("express");
const Attendee = require("../models/Attendee");

const router = express.Router();

// Add RSVP
router.post("/rsvp", async (req, res) => {
    const { name, email, preference, role } = req.body;
    const newAttendee = new Attendee({ name, email, preference, role });
    await newAttendee.save();
    res.json({ message: "RSVP received", attendee: newAttendee });
});

// Get all attendees
router.get("/attendees", async (req, res) => {
    const attendees = await Attendee.find();
    res.json(attendees);
});

// Sort attendees by preference
router.get("/attendees/sorted", async (req, res) => {
    const sortedAttendees = await Attendee.find().sort({ preference: 1 });
    res.json(sortedAttendees);
});

module.exports = router;
