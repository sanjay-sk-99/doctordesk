require("dotenv").config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")

const app = express();

//middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))