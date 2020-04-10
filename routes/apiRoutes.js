const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

//--------------------- "api/v1/..." ---------------------

//--------------------- AUTH ---------------------
router.post("/login", ctrl.auth.login);
router.post("/register", ctrl.auth.register);
router.delete("/logout", ctrl.auth.logout);
//--------------------- USER ---------------------
router.get("/users", ctrl.user.index);
//--------------------- COUNTRY ---------------------
router.get("/countries", ctrl.country.index);


module.exports = router;