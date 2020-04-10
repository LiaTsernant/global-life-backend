const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: String,
    resque: {
        emergency: { required: true, type: Number },
        police: { required: true, type: Number },
        firefighters: { required: true, type: Number },
        crisisHotline: { required: true, type: Number },
    }
}, {timestamps: true});

module.exports = mongoose.model("Country", CountrySchema);