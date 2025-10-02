const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createDoctor, getDoctors,updateDoctor,deleteDoctor } = require("../controller/adminController");
const { addPatient,getMyPatients,updatePatient,deletePatient } = require("../controller/doctorController")

const router = express.Router();

// Admin (only role=admin)
router.post("/adddoc", authMiddleware(["admin"]), createDoctor);
router.get("/getdoc", authMiddleware(["admin"]), getDoctors);
router.put("/doctor/:id",  authMiddleware(["admin"]),updateDoctor);
router.delete("/doctor/:id",  authMiddleware(["admin"]),deleteDoctor);

router.post("/addpatient", authMiddleware(["admin"]), addPatient);
router.get("/getpatient", authMiddleware(["admin"]), getMyPatients);
router.put("/patient/:id", authMiddleware(["admin"]),updatePatient);
router.delete("/patient/:id", authMiddleware(["admin"]),deletePatient);

module.exports = router;
