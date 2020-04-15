const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
// const verifyToken = require('../middleware/verification');


//--------------------- "api/v1/..." ---------------------

//--------------------- AUTH ---------------------
router.post("/login", ctrl.auth.login);
router.post("/register", ctrl.auth.register);
// router.delete("/logout", ctrl.auth.logout);
//--------------------- USER ---------------------
router.get("/users", ctrl.user.index);
//--------------------- COUNTRY ---------------------
router.get("/countries", ctrl.country.index);
router.get("/countries/:countryName", ctrl.country.show);
//--------------------- USER ---------------------
router.get('/users', ctrl.user.index)
router.get('/users/:userId', ctrl.user.show)

module.exports = router;