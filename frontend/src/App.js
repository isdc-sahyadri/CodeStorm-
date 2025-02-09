import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preference, setPreference] = useState("");
    const [role, setRole] = useState("");
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        fetchAttendees();
    }, []);

    const handleRSVP = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5001/api/rsvp", { name, email, preference, role });
        fetchAttendees();
    };

    const fetchAttendees = async () => {
        const response = await axios.get("http://localhost:5001/api/attendees/sorted");
        setAttendees(response.data);
    };

    return (
        <div>
            <h2>Event RSVP</h2>
            <form onSubmit={handleRSVP}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <select onChange={(e) => setPreference(e.target.value)} required>
                    <option value="">Select Preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="speaker">Speaker</option>
                </select>
                <select onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="VIP">VIP</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Guest">Guest</option>
                </select>
                <button type="submit">Submit RSVP</button>
            </form>

            <h3>Attendee List</h3>
            <ul>
                {attendees.map((attendee, index) => (
                    <li key={index}>{attendee.name} - {attendee.preference} - {attendee.role}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

