const mongoose = require('mongoose');

require('dotenv').config()

dbConnect() .then(()=>console.log('DB Connected')).catch(err => console.log(err));

async function dbConnect ()  {
  await mongoose.connect(process.env.DB_URL);
}

module.exports =dbConnect;
