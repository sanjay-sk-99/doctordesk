const Patient = require("../models/patientModel")
const User = require("../models/userModel")

exports.addPatient = async (req, res) => {
    try {
    const { name, age, gender, phone, address, medicalHistory, doctorId } = req.body;
 
    let doctor;

    // If Admin adds patient → doctorId must be provided
    if (req.user.role === "admin") {
      if (!doctorId) {
        return res.status(400).json({ error: "doctorId is required when admin adds patient" });
      }

      doctor = await User.findOne({ doctorId, role: "doctor" });
    console.log(doctor)
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found with this doctorId" });
      }
    }

    // If Doctor adds patient → use logged in doctor's info
    if (req.user.role === "doctor") {
      doctor = await User.findById(req.user.id);
    }

    const patient = new Patient({
      doctor: doctor._id,
      doctorId: doctor.doctorId, // save doctorId string also
      name,
      age,
      gender,
      phone,
      address,
      medicalHistory,
    });

    await patient.save();

    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPatients = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "doctor") {
      // Doctor → only their patients
      query.doctor = req.user.id;
    }

    if (req.user.role === "admin") {
      // Admin → all patients OR filter by doctorId (optional)
      const { doctorId } = req.query; // e.g. /patients?doctorId=DOC01

      if (doctorId) {
        // find doctor by doctorId string
        const doctor = await User.findOne({ doctorId, role: "doctor" });
        if (!doctor) {
          return res.status(404).json({ error: "Doctor not found" });
        }
        query.doctor = doctor._id;
      }
    }

    const patients = await Patient.find(query)
      .populate("doctor", "doctorId doctorProfile.name doctorProfile.specialization");

    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params; // patient _id
    const updates = req.body;

    const patient = await Patient.findByIdAndUpdate(id, updates, { new: true });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ message: "Patient updated successfully", patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};