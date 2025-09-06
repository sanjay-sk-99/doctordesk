const express = require("express")
const { authMiddleware } = require("../middleware/authMiddleware")
const { addPatient,getMyPatients } = require("../controller/doctorController")

const router = express.Router()

// Admin (only role=admin)
router.post("/addpatient", authMiddleware(["doctor"]), addPatient);
router.get("/getpatient", authMiddleware(["doctor"]), getMyPatients);

module.exports = router