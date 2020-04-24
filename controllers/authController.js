const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const client = require('../send_sms');
require('dotenv').config();

const register = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot register user." });
    if (foundUser) return res.status(404).json({ status: 404, error: "Account already registered." });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(404).json({ status: 404, error: "Cannot register user." });
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(404).json({ status: 404, error: "Cannot register user." });
        const userInfo = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          address: req.body.address,
          photo: req.body.photo,
          contactPersonName: req.body.contactPersonName,
          contactPersonPhone: req.body.contactPersonPhone,
          country: req.body.country
        };

        db.User.create(userInfo, (err, savedUser) => {
          if (err) return res.status(500).json(err);

          const token = jwt.sign(
            {
              email: savedUser.email,
              _id: savedUser._id
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30 days"
            },
          );

          let twilioMessage = {
            body: `${savedUser.firstName}! Thank you for registration at Global Life`,
            from: '+12055707505',
            to: '+14158665819'
          };

          client.messages
            .create(twilioMessage)
            .then(message => {
              console.log(message.sid) //for testing

              return res.status(200).json({
                message: 'User Created',
                messageSid: message.sid,
                token
              });
            }
          );
        });
      });
    });
  });
};

const login = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot login a user" });
    if (!foundUser) return res.status(404).json({ status: 404, error: "Invalid credentials." });

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(404).json({ status: 404, error: "Cannot login a user" });
      if (isMatch) {
        const token = jwt.sign(
          {
            email: foundUser.email,
            _id: foundUser._id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30 days"
          },
        );
        return res.status(200).json({
          status: 200,
          message: 'User Logged In',
          token
        });
      } else {
        res.status(404).json({ status: 404, error: "Cannot login. Please, try again." });
      };
    });
  });
};

module.exports = {
  register,
  login,
};