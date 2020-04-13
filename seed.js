const db = require("./models");

const countries = [
    {
        name: "Russia",
        emergency: '103',
        police: '102',
        firefighters: '101',
        crisisHotline:  '88002000122'
    }
];

db.Country.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
      process.exit();
    };
    console.log(`Successfully deleted ${result.deletedCount} countries.`);

    db.Country.create(countries, (err, newCountries) => {
        if (err) {
          console.log(err);
          process.exit();
        };
        console.log(`Successfully created ${newCountries.length} countries.`);
        process.exit();
    });
});



