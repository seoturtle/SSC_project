const express = require('express');
const router = express.Router();
const msql = require('./db');
const cors = require('cors');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.post('/talk_submit', (req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const idx = req.body.midx;
    const sex = req.body.sex;
    const content = req.body.content;
    const param = [email, name, idx, sex, content]
    const sql = "INSERT INTO `talk` (`email`, `name`, `midx`, `sex`, `content`) VALUES (?, ?, ?, ?, ?)"
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
    const sql = "SELECT * FROM talk order by date desc"
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
    const sql = "DELETE FROM talk where id = ?"
    msql.query(sql, id, (err, data) => {
        if(err){
            console.log(err);
        }else{
            console.log("삭제");
        }
        res.end();
    })
})

router.post('/memo', (req,res) => {
    const midx = req.body.midx;
    const memo = req.body.memo;
    const params = [memo, midx]

    const sql1 = "SELECT * FROM memo where midx = ?"
    const sql2 = "INSERT INTO `memo` (`memo`, `midx`) VALUES (?, ?)"
    const sql3 = "UPDATE memo set memo = ? where midx = ?"
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
    const sql = "SELECT * FROM memo where midx = ?"
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