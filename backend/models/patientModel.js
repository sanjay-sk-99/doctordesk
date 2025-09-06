const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // references the doctor (User with role=doctor)
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  phone: String,
  address: String,
  medicalHistory: [
    {
      diagnosis: String,
      treatment: String,
      prescription: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
