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

    res.json(foundUser);
  });
};



module.exports = {
  index,
  show
}