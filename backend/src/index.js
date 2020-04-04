require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./api');
const passport = require('passport');
const passportConfig = require('./config/passport');

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  JWT_SECRET_KEY: jwtKey,
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

app.use(passport.initialize());
passportConfig(passport, jwtKey);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api', router);

app.listen(port, () => console.log('Listening on port 4000!'));