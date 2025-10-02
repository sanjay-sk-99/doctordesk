// models/User.js
const mongoose = require("mongoose");
const Counter = require("./counterModel");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ["admin", "doctor"], required: true },

    doctorId: { type: String }, // e.g. DOC01 (only for doctors)

    doctorProfile: {
      name: {
        type: String,
        required: function () {
          return this.role === "doctor";
        },
      },
      specialization: {
        type: String,
        required: function () {
          return this.role === "doctor";
        },
      },
      phone: {
        type: String,
        required: function () {
          return this.role === "doctor";
        },
      },
      category: {
        type: String,
        enum: ["Senior", "Junior", "Intern"],
        required: function () {
          return this.role === "doctor";
        },
      },
    },
    isActive: {
      type: Boolean,
      default: true, // patients are active unless marked otherwise
    },
  },
  { timestamps: true }
);

// Auto-generate doctorId before saving (only for doctors)
userSchema.pre("save", async function (next) {
  if (this.isNew && this.role === "doctor") {
    const counter = await Counter.findOneAndUpdate(
      { id: "doctor" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.doctorId = `DOC${String(counter.seq).padStart(2, "0")}`;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
