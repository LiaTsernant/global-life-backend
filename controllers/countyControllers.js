const db = require("../models");

const index = (req, res) => {
    db.Country.find({}, (err, foundCities) => {
      if (err) return res.status(404).json({ status: 404, error: "Cannot find all cities"});
      
      res.json(foundCities);
    });
};

module.exports = {
    index,
}