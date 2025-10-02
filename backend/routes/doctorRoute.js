const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { addPatient, getMyPatients,updatePatient,deletePatient } = require("../controller/doctorController");

const router = express.Router();

// Doctor (only role=doctor)
router.post("/addpatient", authMiddleware(["doctor"]), addPatient);
router.get("/getpatient", authMiddleware(["doctor"]), getMyPatients);
router.put("/patient/:id", authMiddleware(["doctor"]),updatePatient);
router.delete("/patient/:id", authMiddleware(["doctor"]),deletePatient);

module.exports = router;
