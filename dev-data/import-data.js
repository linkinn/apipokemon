const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../src/app/schemas/userSchema');
const Pokemon = require('../src/app/schemas/pokemonSchema');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'));

// Read json file
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const pokemons = JSON.parse(
  fs.readFileSync(`${__dirname}/pokemon.json`, 'utf-8')
);

// Import data into db
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Pokemon.create(pokemons);
    console.log('Data import success');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from db
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Pokemon.deleteMany();
    console.log('Data delete success');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
