const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    require:true,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["Open", "Pending"],
  },

  day: { type: String, enum: ["Thursday", "Friday"], required: true },
  time: { type: String, default: "10:00 AM" },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);
