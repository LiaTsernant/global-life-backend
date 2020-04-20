const db = require("./models");

const countries = [
  {
    name: "Russia",
    emergency: '103',
    police: '102',
    firefighters: '101',
  },
  {
    name: "Egypt",
    emergency: '123',
    police: '122',
    firefighters: '180',
  },
  {
    name: "Greece",
    emergency: '166',
    police: '100',
    firefighters: '199',
  },
  {
    name: "Italy",
    emergency: '118',
    police: '113',
    firefighters: '115',
  },
  {
    name: "Austria",
    emergency: '144',
    police: '144',
    firefighters: '122',
  },
  {
    name: "Albania",
    emergency: '127',
    police: '129',
    firefighters: '128',
  },
  {
    name: "Azerbaijan",
    emergency: '103',
    police: '102',
    firefighters: '101',
  },
  {
    name: "Bulgaria",
    emergency: '150',
    police: '166',
    firefighters: '160',
  },
  {
    name: "Belgium",
    emergency: '100',
    police: '101',
    firefighters: '100',
  },
  {
    name: "Macedonia",
    emergency: '194',
    police: '192',
    firefighters: '193',
  },
  {
    name: "Romania",
    emergency: '961',
    police: '955',
    firefighters: '981',
  },
  {
    name: "Serbia",
    emergency: '194',
    police: '192',
    firefighters: '193',
  },
  {
    name: "Singapore",
    emergency: '995',
    police: '999',
    firefighters: '995',
  },
  {
    name: "Slovakia",
    emergency: '155',
    police: '158',
    firefighters: '150',
  },
];

db.Country.deleteMany({}, (err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  };
  console.log(`Successfully deleted ${result.deletedCount} countries.`);
  console.log('Deleting all users...');
  db.User.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
      process.exit();
    };
    console.log(`Successfully deleted ${result.deletedCount} users.`);
    console.log('Creating new countries...');
    db.Country.create(countries, (err, countries) => {
      if (err) {
        console.log(err);
        process.exit();
      };
      console.log(`Successfully created ${countries.length} countries.`);
      process.exit();
    });
  });
});