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
    const sql = "SELECT user_idx, email, name, sex FROM users where email LIKE ? and not email = ?"
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

router.post('/userlist', (req, res) => {
    const midx = req.body.midx;
    const email = req.body.email;
    const memail = req.body.memail;
    const mname = req.body.mname;
    console.log(email)
    UserChat.find({midx: midx, name: new RegExp(email)}).exec(function(err, result) {
        if(err){
            console.log(err)
        }else{
            // console.log(result)
            res.send({result: result})
        }
        res.end()
    })
})

router.post('/add', (req, res) => {
    const oidx = req.body.oidx;
    const midx = req.body.midx;
    const sql = "SELECT email, name, sex from users where user_idx = ?"
    msql.query(sql, oidx, (err, data) => {
        if(err) {
            console.log(err);
        }else{
           UserChat.findOne({midx: midx, oidx: oidx}).exec(function(err, result) {
               if(err){
                   console.log(err);
               }else{
                   if(result==null){
                    UserChat.create(
                        {
                            midx: midx,
                            oidx: oidx,
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

router.post('/add2', (req, res) => {
    const oidx = req.body.oidx;
    const midx = req.body.midx;
    const sql = "SELECT email, name, sex from users where user_idx = ?"
    msql.query(sql, midx, (err, data) => {
        if(err) {
            console.log(err);
        }else{
           UserChat.findOne({midx: oidx, oidx: midx}).exec(function(err, result) {
               if(err){
                   console.log(err);
               }else{
                   if(result==null){
                    UserChat.create(
                        {
                            midx: oidx,
                            oidx: midx,
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
            }else{
                res.send({result: result});
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
        }
    })
})

router.post('/delete', (req, res) => {
    const midx = req.body.midx;
    const oidx = req.body.oidx;
    UserChat.remove({midx: midx, oidx: oidx}, function(err, result) {
    });
    res.end();
})

router.post('/check', (req, res) => {
    const midx = req.body.midx;
    UserChat.find({midx: midx}, {_id:0, "oidx":1}).distinct('oidx').exec(function(err, result) {
        res.send({result: result});
    })
})

router.post('/header', (req, res) => {
    const value = req.body.value+'%';
    const sql = "SELECT  stock_summary_name, lpad(stock_code,6,0) as stock_code , stock_class from stock where stock_summary_name like ?"

    msql.query(sql, value, (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log(data)
            res.send({result: data})
        }
    })
})

module.exports = router;