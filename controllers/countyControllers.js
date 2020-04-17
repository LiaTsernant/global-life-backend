const db = require("../models");

const index = (req, res) => {
    db.Country.find({}, (err, foundCountries) => {
      if (err) return res.status(404).json({ status: 404, error: "Cannot find all countries"});
      res.json(foundCountries);
    });
};

const show = (req, res) => {
  db.Country.findOne({ name: req.params.countryName }, (err, foundCountry) => {
    if (err) return res.status(404).json({ status: 404, error: "Cannot find a country`"});  
    res.json(foundCountry);
  });
};

module.exports = {
  index,
  show,
};