const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const attendeeRoutes = require("./routes/attendeeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use attendee routes
app.use("/api", attendeeRoutes);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/rsvpDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Set PORT to 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
