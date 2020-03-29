require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./api');

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
} = process.env;

mongoose
  .connect(
    mongoURI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  )
  .then(() => {
    console.log('Connected to mongodb!');
  })
  .catch(error => {
    console.log(error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => console.log('Listening on port 4000!'));