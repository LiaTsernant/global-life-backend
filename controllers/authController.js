const db = require("../models");
const bcrypt = require("bcryptjs");
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
                db.User.create(userInfo, (err, newUser) => {
                    if (err) return res.status(404).json({ status: 404, error: "Cannot create a new user" });

                    const resUser = {
                        _id: newUser._id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        address: newUser.address,
                        photo: newUser.photo,
                        contactPerson: newUser.contactPerson,
                        country: newUser.country
                    };
                    res.status(201).json({status: 201, user: resUser, message: "User Created!" });

                    // AUTO SENDING EMAIL
                    // sendEmail(resUser.email, resUser.firstName);
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
                const currentUser = {
                    _id: foundUser._id,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    email: foundUser.email,
                    address: foundUser.address,
                    photo: foundUser.photo,
                    contactPerson: foundUser.contactPerson,
                    country: foundUser.country
                };
                req.session.currentUser = currentUser;
                res.status(201).json({ status: 201, user: currentUser })
            } else {
                res.status(404).json({ status: 404, error: "Cannot login. Please, try again." });
            };
        });
    });
};

const logout = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(404).json({ status: 404, error: "Cannot logout a user" });
    };

    req.session.destroy((err) => {
        if (err) return res.status(404).json({ status: 404, error: "Cannot logout a user" });
        res.status(201).json({ status: 201, message: "Logged out!" })
    });
};

const verify = (req, res) => {
    if (req.session.currentUser) {
        return res.json({
            status: 200, 
            message: "Authorized",
            currentUser: req.session.currentUser
        });
    };
};

module.exports = {
    register,
    login,
    logout,
    verify,
};