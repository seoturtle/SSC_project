const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

dotenv.config({path: './.env'});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/', require('./routes/login'));
app.use('/search', require('./routes/search'));

//mongodb
mongoose.connect('mongodb://localhost:27017/ssc', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected successful'))
.catch((err) => console.error(err));
mongoose.set('useCreateIndex', true);



const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));