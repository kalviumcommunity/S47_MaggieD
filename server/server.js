const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require('cors');
const dbConnect = require("./db/dbConnection.js")
const mongoose = require('mongoose');
const router = require('./route.js') 

dotenv.config()

app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL 

dbConnect(DATABASE_URL)

app.use(router);

app.get("/home", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : "Disconnected";
    res.send(`Datbase connection Status: ${dbStatus}`);
})

app.listen(3000)