require("dotenv").config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoute = require("./routes/authRoute")
const adminRoute = require("./routes/adminRoute")
const doctorRoute = require("./routes/doctorRoute")

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

//login for both doctor and admin
app.use("/api/v1/auth", authRoute)

// Admin (only role=admin) 
app.use("/api/v1/admin",adminRoute)


// Doctor (only role=doctor)
app.use("/api/v1/doctor",doctorRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))