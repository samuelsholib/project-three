const db = require('../config/connection');
const { User, Pet } = require('../models');
const userSeeds = require('./userSeeds.json');
const petSeeds = require('./petSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Pet.deleteMany({})
    await User.create(userSeeds);
    await Pet.create(petSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
