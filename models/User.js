const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String },
  password: String ,
  address: { required: true, type: String },
  photo: { type: String, default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" },
  contactPersonName: { required: true, type: String },
  contactPersonPhone: { required: true, type: String },

  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);