const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
const db = require('./routes/db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', api);

app.post("/text", (req, res) => {//데이터 받는 곳
    const text1 = req.body.email;
    console.log(text1);
  });

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));