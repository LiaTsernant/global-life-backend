const db = require("../models");

const index = (req, res) => {
  db.User.find({}).populate('country', '_id name emergency police firefighters').exec((err, foundUsers) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find all users" });
    res.json(foundUsers);
  });
};

const show = (req, res) => {
  db.User.findById(req.params.userId).populate('country', '_id name emergency police firefighters').exec((err, foundUser) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find a user" });

    let returnUser = {
      _id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      address: foundUser.address,
      contactPersonName: foundUser.contactPersonName,
      contactPersonPhone: foundUser.contactPersonPhone,
      country: foundUser.country,
      photo: foundUser.photo
    };

    res.json(returnUser);
  });
};

const update = (req, res) => {
  console.log('UPDATING')
  db.User.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, updatedUser) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find a user by id and update" });
    res.json(updatedUser);
  });
};

const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.userId, (err, result) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find a user by id and delete" });
    res.json(result);
  });
};

module.exports = {
  index,
  show,
  update,
  destroy
};