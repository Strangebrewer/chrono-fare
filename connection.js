const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER } = process.env;

const uri = process.env.MONGODB_URI || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/chrono_fare?retryWrites=true`;

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo'))
  .catch(err => console.log('Error connecting to Mongo: ', err));

module.exports = mongoose.connection;