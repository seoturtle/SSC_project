const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './.env'});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/', require('./routes/login'));

//mongodb
const mdb = mongoose.connection;
mdb.on('error', console.error);
mdb.once('open', function() {
  console.log('connected mongodb server!');
});

mongoose.connect('mongodb://localhost:27017/ssc');



const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));