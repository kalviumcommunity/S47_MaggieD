const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./route.js');
const dbConnect = require("./db/dbConnection.js");

dotenv.config();

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json()); // Add middleware to parse JSON bodies

// Database connection
dbConnect(DATABASE_URL);

app.use(router);

app.get("/home", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database connection Status: ${dbStatus}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});