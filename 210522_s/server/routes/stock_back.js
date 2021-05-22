const express = require('express');
const router = express.Router();
const msql = require('./db');
const cors = require('cors');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.post('/talk_submit', (req,res) => {
    const idx = req.body.midx;
    const content = req.body.content;
    const param = [idx, content]
    const sql = "INSERT INTO `talk` (`user_idx`, `content`) VALUES (?, ?)"
    msql.query(sql, param, (err, data) => {
        if(err){
            console.log(err);
        }else{
            console.log("성공");
        }
        res.end();
    })
})

router.post('/talk_content', (req,res) => {
    const sql = "SELECT talk.talk_idx, talk.user_idx, users.email, users.name, talk.content, talk.date FROM users, talk  where users.user_idx = talk.user_idx order by date desc"
    msql.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.send({result: data});
        }
        res.end();
    })
})

router.post('/talk_delete', (req, res) => {
    const id = req.body.id;
    const sql = "DELETE FROM talk where talk_idx = ?"
    msql.query(sql, id, (err, data) => {
        if(err){
            console.log(err);
        }else{
        }
        res.end();
    })
})

router.post('/memo', (req,res) => {
    const midx = req.body.midx;
    const content = req.body.content;
    const params = [content, midx]

    const sql1 = "SELECT content FROM memo where user_idx = ?"
    const sql2 = "INSERT INTO `memo` (`content`, `user_idx`) VALUES (?, ?)"
    const sql3 = "UPDATE memo set content = ? where user_idx = ?"
    msql.query(sql1, midx, (err, data) => {
        if(err){
            console.log(err);
        }else{
            if(data==0){
                msql.query(sql2, params, (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("등록");
                    }
                })
            }else{
                msql.query(sql3, params, (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("수정");
                    }
                })
            }
        }
        res.end();
    })
})

router.post('/memo2', (req,res) => {
    const midx = req.body.midx;
    const sql = "SELECT content FROM memo where user_idx = ?"
    msql.query(sql, midx, (err, data) => {
        if(err){
            console.log(err);
        }else{
            if(data==0){
                console.log("데이터 없다");
            }else{
                res.send({result: data});
            }
        }
    })
})

module.exports = router;