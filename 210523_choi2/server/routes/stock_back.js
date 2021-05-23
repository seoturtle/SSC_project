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
    const user_idx = req.body.user_idx;
    const sql = "SELECT distinct talk.talk_idx, users.email, users.name, talk.content, talk.date FROM users right join talk on users.user_idx = talk.user_idx left join liked ON talk.talk_idx = liked.talk_idx order by date desc"
    msql.query(sql,user_idx, (err, data) => {
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

router.post('/like', (req, res) => {
    const user_idx = req.body.user_idx;
    const talk_idx = req.body.talk_idx;
    const param = [user_idx, talk_idx]
    const sql = "SELECT * FROM liked where user_idx = ? AND talk_idx = ?"
    const sql2 = "INSERT INTO `liked` (`user_idx`, `talk_idx`) VALUES (?, ?)"
    const sql3 = "UPDATE liked set like_check = 1 where user_idx = ? AND talk_idx = ?"
    const sql4 = "UPDATE talk set like_cnt = like_cnt + 1 where user_idx = ? AND talk_idx = ?"

    msql.query(sql, param, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            if(data==0){
                msql.query(sql2, param, (err, data) => {
                    if(err) {
                        console.log(err)
                    }else{
                        msql.query(sql4, param, (err, data) => {
                            if(err) {
                                console.log(err)
                            }else{
                                console.log("처음 좋아요")
                            }
                        })
                    }
                })
            }else{
                msql.query(sql3, param, (err, data) => {
                    if(err) {
                        console.log(err)
                    }else{
                        msql.query(sql4, param, (err, data) => {
                            if(err) {
                                console.log(err)
                            }else{
                                console.log("이미 등록된사람 업데이트")
                            }
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;