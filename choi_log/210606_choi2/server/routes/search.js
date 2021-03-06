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
                    console.log("mongodb ??????");
               }else{
                   console.log("?????? ???????????????");
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
                    console.log("mongodb ??????");
               }else{
                   console.log("?????? ???????????????");
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
    UserChat.deleteOne({midx: midx, oidx: oidx}, function(err, result) {
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
    const sql = "SELECT  stock_summary_name, stock_code , stock_class from stock where stock_summary_name like ?"

    msql.query(sql, value, (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/news', (req, res) => {
    var client_id = '8yuc9GggU3vmWkhIcKw_';
    var client_secret = 'uLkf1qQKRb';
    const code = req.body.code;
    var api_url = 'https://openapi.naver.com/v1/search/news?query='+encodeURI(code)+'&start=1&display=100';
    var request = require('request');
    var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {

        if(error) {
            console.log(error)
        }else{
            let json = JSON.parse(body)
            res.send({result: json})
        }
   });
})

router.post('/major_news', (req, res) => {
    var client_id = '8yuc9GggU3vmWkhIcKw_';
    var client_secret = 'uLkf1qQKRb';
    var api_url = 'https://openapi.naver.com/v1/search/news?query='+encodeURI('?????????|?????????')+'&start=1&display=10';
    var request = require('request');
    var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {

        if(error) {
            console.log(error)
        }else{
            let json = JSON.parse(body)
            res.send({result: json})
        }
   });
})

router.post('/stock_chart', (req, res) => {
    const code = req.body.code;
    var url = 'https://fchart.stock.naver.com/sise.nhn?symbol='+code+'&timeframe=day&count=3650&requestType=0';
    var request = require('request');
    const convert = require('xml-js');
    request.get(url, function (error, response, body) {
        if(error) {
            console.log(error)
        }else{
            var json = convert.xml2js(body, {compact: true, spaces: 4})
            var ss = json.protocol.chartdata.item
            // var json2 = JSON.parse(ss)
            res.send(ss);
        }
   });
})

router.post('/filecheck', (req, res) => {
    var fs = require('fs')
    const code = req.body.code;
    fs.readFile('../src/prediction/'+code+'.png', (err, data) => {
    if (err) {
        res.send(false)
        console.log(err)
    }else{
        res.send(true)
        console.log(data)
    }
    
});
})

module.exports = router;