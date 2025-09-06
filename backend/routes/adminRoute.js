const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createDoctor, getDoctors } = require("../controller/adminController");

const router = express.Router();

// Admin (only role=admin)
router.post("/createdoc", authMiddleware(["admin"]), createDoctor);
router.get("/getdoc", authMiddleware(["admin"]), getDoctors);

module.exports = router;
