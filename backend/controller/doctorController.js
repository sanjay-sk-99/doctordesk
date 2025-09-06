const Patient = require("../models/patientModel")

exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender, phone, address, medicalHistory } = req.body;

    const patient = new Patient({
      doctor: req.user.id, // from JWT
      name,
      age,
      gender,
      phone,
      address,
      medicalHistory
    });

    await patient.save();
    res.status(201).json({ message: "Patient added successfully", patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ doctor: req.user.id });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
