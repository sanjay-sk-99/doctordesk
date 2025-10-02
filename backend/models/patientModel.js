// models/Patient.js
const mongoose = require("mongoose");
const Counter = require("./counterModel");

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String }, // e.g. PAT01
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Doctor reference
      required: true,
    },
    doctorId: { type: String, required: true }, // e.g. DOC01 (store doctorId string also)
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    phone: String,
    address: String,
    medicalHistory: [
      {
        diagnosis: String,
        treatment: String,
        prescription: String,
        date: { type: Date, default: Date.now },
      },
    ],
     isActive: {
      type: Boolean,
      default: true, // patients are active unless marked otherwise
    },
  },
  
  { timestamps: true }
);

// Auto-generate patientId before saving
patientSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "patient" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.patientId = `PAT${String(counter.seq).padStart(2, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Patient", patientSchema);
