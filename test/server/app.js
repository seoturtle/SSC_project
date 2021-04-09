const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
const db = require('./routes/db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', api);


// app.post('/text', (req, res) => {//데이터 받는 곳
//     const text1 = req.body.email;
//     console.log(text1);
//     const sql = "INSERT INTO `users` (`email`) VALUES (?)"
//     db.query(sql, [text1], (err, data) => {
//       if(!err) {
//         console.log("성공");
//       }else{
//         console.log(err);
//       }
//     })
//     }
//   );

app.post('/text2', (req, res) => {
  const sql = "SELECT email FROM USERS"
  db.query(sql, (err, data) => {
    if(!err) {
      console.log(data);
      res.send(data[0]);
    }else{
      console.log(err);
    }
  })
})

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));