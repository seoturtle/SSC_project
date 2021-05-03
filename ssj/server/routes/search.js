const express = require('express');
const router = express.Router();
const msql = require('./db');
const cors = require('cors');
const UserChat = require("../models/userChat");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.post('/', (req,res) => {
    const email = req.body.email;
    const memail = req.body.memail;
    const param = [email+'%', memail]
    const sql = "SELECT idx, email, name, sex FROM users where email LIKE ? and not email = ?"
    if(email===""){
        res.send({result: false});
    }else{
        msql.query(sql, param, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.send({result: data});
        }
    })}
})

router.post('/add', (req, res) => {
    const oidx = req.body.oidx;
    const midx = req.body.midx;
    const sql = "SELECT email, name, sex from users where idx = ?"
    msql.query(sql, oidx, (err, data) => {
        if(err) {
            console.log(err);
        }else{
           UserChat.findOne({midx: midx, email: data[0].email}).exec(function(err, result) {
               if(err){
                   console.log(err);
               }else{
                   if(result==null){
                    UserChat.create(
                        {
                            midx: midx,
                            name: data[0].name,
                            email: data[0].email,
                            sex: data[0].sex,
                        }
                    )
                    console.log("mongodb 저장");
               }else{
                   console.log("이미 존재합니다");
               }
            }
           })
        }
        res.end();
    })
})

router.post('/chatList', (req, res) => {
    const midx = req.body.midx;
    UserChat.find({midx: midx}).exec(function(err, result) {
        if(err) {
            console.log("err");
        }else{
            if(result==0){
                res.send({result: false});
                console.log("result==0 :"+ result)
            }else{
                res.send({result: result});
                console.log(result)
            }
        }
    })
})

router.post('/count', (req, res) => {
    const midx = req.body.midx;
    UserChat.countDocuments({midx: midx}, function(err, result) {
        if(err) {
            console.log(err)
        }else {
            res.send({count: result});
            console.log(result)
        }
    })
})

module.exports = router;