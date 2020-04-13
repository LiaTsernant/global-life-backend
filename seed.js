const db = require("./models");

const countries = [
    {
        name: "Russia",
        emergency: '103',
        police: '102',
        firefighters: '101',
        crisisHotline:  '88002000122'
    },

    {
        name: "Egypt",
        emergency: '123',
        police: '122',
        firefighters: '180',
        crisisHotline:  ''
    },

    {
        name: "Greece",
        emergency: '166',
        police: '100',
        firefighters: '199',
        crisisHotline:  ''
    },

    {
        name: "Italy",
        emergency: '118',
        police: '113',
        firefighters: '115',
        crisisHotline:  ''
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



