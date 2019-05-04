const express = require('express');
require('dotenv').config();
require('./connection');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
}

app.use(routes);

app.listen(PORT, () => {
   console.log(`====> API Server now listening on PORT ${PORT}!`);
});
