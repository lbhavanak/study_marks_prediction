
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());            // Allow frontend to access backend
app.use(bodyParser.json()); // Parse JSON body

// Array to store student predictions
let studentData = [];

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Prediction API
app.post("/predict", (req, res) => {
    const { name, hours, age, className, subject } = req.body;

    if (!name) return res.json({ error: "Name is required" });
    if (hours < 0) return res.json({ error: "Hours cannot be negative" });

    // Calculate marks (simple formula)
    let marks = hours * 10;
    if (marks > 100) marks = 100;

    const student = { name, age, className, subject, marks };
    studentData.push(student);

    res.json(student);
});

// API to get all predictions
app.get("/all-predictions", (req, res) => {
    res.json(studentData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
