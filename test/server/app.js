const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./routes/db');
const crypto = require('crypto');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/text', (req, res) => {//데이터 받는 곳
    const text1 = req.body.email;
    console.log(text1);
    const sql = "INSERT INTO `users` (`email`) VALUES (?)"
    db.query(sql, [text1], (err, data) => {
      if(!err) {
        console.log("성공");
      }else{
        console.log(err);
      }
    })
    }
  );

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

app.post('/email', (req, res) => {
  const text1 = req.body.email;
  const sql = "SELECT email from users where email = ?"
  console.log(text1);
  db.query(sql, text1, (err, data) => {
    if(err){
      console.log(err);
    }else if(data[0]==undefined) {
      res.send(true);
      console.log(data[0]);
    }else{
      res.send(false);
      console.log(data);
    }
  })
})

app.post('/phone', (req, res) => {
  const sql = "SELECT phone from users where phone = ?"
  db.query(sql, req.body.phone, (err, data) => {
    if(err) {
      console.log(err)
    }else if(data[0] == undefined) {
      res.send({data: true});
    }else{
      res.send({data: false});
    }
  })
})

app.post('/login', (req,res) => {
  console.log(req.body.email);
  console.log(req.body.pwd);

  const sql = 'SELECT ifnull(`pwd`, NULL) AS `pwd`, ifnull(`salt`, NULL) AS `salt` FROM `users` RIGHT OUTER JOIN (SELECT "") AS `users` ON `email` = ?'
  const param = [req.body.email]
  db.query(sql, param, (err, data) => {
      if(!err) {
          if(data[0].salt !== null){
              crypto.pbkdf2(req.body.pwd, data[0].salt, 1203947, 64, 'sha512', (err, key) => {
              console.log('비밀번호 일치 여부 :: ', key.toString('base64') === data[0].pwd);
              // true : 아이디, 비밀번호 일치
              // false : 아이디 일치, 비밀번호 불일치
              res.send({ result : key.toString('base64') === data[0].pwd })
              });
          } else {
              // null : 아이디 불일치
              res.send({ result : data[0].salt })
          }
      } else {
          res.send(err)
      }
  })
})

app.post('/user', (req,res) => {
  crypto.randomBytes(64, (err, buf) => {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const name = req.body.name;
    const sex = req.body.sex;
    const phone = req.body.phone;
    //salt는 생성하는 해시값 이외에 추가적인 암호화 값
      const salt = buf.toString('base64');
      console.log('salt :: ', salt);
      //crypto.pbkdf2의 salt 뒤 숫자 파라미터는 임의의 값으로 주어준다.
      crypto.pbkdf2(pwd, salt, 1203947, 64, 'sha512', (err, key) => {
          console.log('password :: ', key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
          // 쿼리 작성하여 전달
          const sql = "INSERT INTO `users` (`email`, `pwd`, `salt`, `name`, `sex`, `phone`) VALUES (?, ?, ?, ?, ?, ?)"
          const param = [email, key.toString('base64'), salt, name, sex, phone]
          db.query(sql, param, (err, data) => {
              if(!err) {
                  res.send(data)
              } else {
                  res.send(err)
              }
          })
      });
  });
})

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));