const db = require("../models");

const index = (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find all users" });

    res.json(foundUsers);
  });
};

const show = (req, res) => {
  db.User.findById(req.params.userId, (err, foundUser) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find a user" });

    let returnUser = {
      _id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      address: foundUser.address,
      contactPerson: foundUser.contactPerson,
      country: foundUser.country,
      photo: foundUser.photo
    }

    res.json(returnUser);
  });
};

const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find a user by id and delete" });

    res.json(result);
  });
};



module.exports = {
  index,
  show
}