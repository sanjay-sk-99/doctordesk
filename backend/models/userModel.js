const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, // Will be hashed with bcrypt
    },
    role: {
      type: String,
      enum: ["admin", "doctor"],
      required: true,
    },
    doctorProfile: {
      // only required when role = doctor
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

