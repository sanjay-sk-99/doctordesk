const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.createDoctor = async (req, res) => {
  try {
    const { username, email, password, doctorProfile } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new User({
      username,
      email,
      password: hashedPassword,
      role: "doctor",
      doctorProfile: doctorProfile,
    });

    await doctor.save();
    console.log(doctor);
    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const { category } = req.query; // optional filter
    const query = { role: "doctor" };
    if (category) query["doctorProfile.category"] = category;

    const doctors = await User.find(query, "-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
