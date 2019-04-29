import express from 'express';
require('dotenv').config();
require('./connection');
const app = express();
// import routes from './routes';
const PORT = process.env.PORT || 8080;
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

if (process.env.NODE_ENV === 'production')
  app.use(express.static('client/build'));

// app.use(routes);

app.listen(PORT, () => {
  console.log(`====> API Server now listening on PORT ${PORT}!`);
});
