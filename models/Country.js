const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  emergency: { required: true, type: String },
  police: { required: true, type: String },
  firefighters: { required: true, type: String },
  crisisHotline: String,
}, { timestamps: true });

module.exports = mongoose.model("Country", CountrySchema);