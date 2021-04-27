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
    const uemail = req.body.uemail;
    const param = [email+'%', uemail]
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
            if(UserChat.find({email: data[0].email})){
                // console.log(data[0].email);
            }else{
                UserChat.create(
                    {
                        midx: midx,
                        name: data[0].name,
                        email: data[0].email,
                        sex: data[0].sex,
                    }
                )
            }
        }
    })
})

router.post('/chatList', (req, res) => {
    const midx = req.body.midx;

    UserChat.find({midx: midx}).exec(function(err, result) {
        if(err) {
            console.log("err");
        }else{
            console.log(result);
        }
    })
})

module.exports = router;