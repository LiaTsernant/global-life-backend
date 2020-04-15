const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// // let AWS = require('aws-sdk');
// AWS.config.update({region: 'us-west-1'});
// let sendEmail = require('../aws_ses');

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
                    contactPerson: req.body.contactPerson,
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
                    // AUTO SENDING EMAIL
                    // sendEmail(resUser.email, resUser.firstName);

                    return res.status(200).json({
                      message: 'User Created',
                      token
                    });
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