const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

// 이메일 체크
router.post('/email', (req, res) => {
  const text1 = req.body.email;
  const sql = "SELECT email from users where email = ?"
  console.log(text1);
  db.query(sql, text1, (err, data) => {
    if(err){
      console.log(err);
    }else if(data[0]==undefined) {
      res.send({result:undefined});
      console.log(data[0]);
    }else{
      res.send({result:false});
      console.log(data);
    }
  })
})

// 핸드폰번호 체크
router.post('/phone', (req, res) => {
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

// 로그인, 토큰값
router.post('/', (req,res) => {
  console.log(req.body.email);
  console.log(req.body.pwd);
  const sql = 'SELECT * FROM `users` RIGHT OUTER JOIN (SELECT "") AS `users` ON `email` = ?'
  const param = [req.body.email]
  db.query(sql, param, (err, data) => {
      if(!err) {
          if(data[0].salt !== null){
            const user = {
              idx : data[0].user_idx,
              name : data[0].name,
              email : data[0].email,
              phone : data[0].phone,
              sex : data[0].sex
            }
              crypto.pbkdf2(req.body.pwd, data[0].salt, 1203947, 64, 'sha512', (err, key) => {
              console.log('비밀번호 일치 여부 :: ', key.toString('base64') === data[0].pwd);
              // true : 아이디, 비밀번호 일치
              // false : 아이디 일치, 비밀번호 불일치
              if(key.toString('base64') === data[0].pwd){
                const token = jwt.sign(user, process.env.JWT_SECRET,{
                  expiresIn: process.env.JWT_EXPIRES_IN,
                  algorithm : process.env.JWT_ALGORITHM,
                  issuer : "ssc",
                });
                res.send({result: true, token: token});
              }else{
                res.send({result:false});
              }
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

// 회원가입 암호화
router.post('/user', (req,res) => {
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

module.exports = router;