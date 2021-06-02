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
    const code = req.body.code;
    const param = [idx, content, code]
    const sql = "INSERT INTO `talk` (`user_idx`, `content`, `stock_code`) VALUES (?, ?, ?)"
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
    const code =req.body.code;
    const param = [user_idx, code]
    // const sql = "SELECT talk.talk_idx, users.email, users.name, talk.content, talk.date FROM users, talk right join talk on users.user_idx = talk.user_idx left join liked ON talk.talk_idx = liked.talk_idx where talk.stock_code = ? order by date desc"
    const sql = "SELECT talk.talk_idx, users.email, users.name, talk.content, talk.date, users.user_idx FROM users, talk WHERE users.user_idx = talk.user_idx AND talk.stock_code = ? order by date desc"
    msql.query(sql,code, (err, data) => {
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
    const code = req.body.code;
    const params = [content, midx, code]

    const sql1 = "SELECT content FROM memo where user_idx = ? AND stock_code = ?"
    const sql2 = "INSERT INTO `memo` (`content`, `user_idx`, `stock_code`) VALUES (?, ?, ?)"
    const sql3 = "UPDATE memo set content = ? where user_idx = ? AND stock_code = ?"
    msql.query(sql1, [midx, code], (err, data) => {
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
    const code = req.body.code;
    const sql = "SELECT content FROM memo where user_idx = ? AND stock_code = ?"
    msql.query(sql, [midx, code], (err, data) => {
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

router.post('/graph_header', (req, res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM stock where stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/favorite', (req, res) => {
    const code = req.body.code;
    const idx = req.body.idx;
    const sql = "INSERT INTO `favorite` (`user_idx`, `stock_code`) VALUES (?, ?)";

    msql.query(sql, [idx, code], (err, data) => {
        if(err){
            console.log(err);
        }else{
            console.log("관심o");
        }
        res.end()
    })
})

router.post('/favorite_check', (req, res) => {
    const code = req.body.code;
    const idx = req.body.idx;
    const sql = "SELECT fav_check from favorite where user_idx = ? AND stock_code = ?"

    msql.query(sql, [idx, code], (err, data) => {
        if(err){
            console.log(err)
        }else{
            if(data == 0){
                console.log("데이터 없다")
            }else{
                res.send({result: data[0].fav_check})

            }
        }
        res.end()
    })
})

router.post('/favorite_delete', (req, res) => {
    const code = req.body.code;
    const idx = req.body.idx;
    const sql = "DELETE FROM favorite WHERE user_idx = ? AND stock_code = ?"

    msql.query(sql, [idx, code], (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("삭제")
        }
        res.end()
    })
})

router.post('/favorite_list', (req, res) => {
    const code = req.body.code;
    const idx = req.body.idx;
    const sql = "SELECT stock.stock_summary_name, stock.stock_code, stock.stock_class FROM favorite, stock WHERE user_idx = ? and favorite.stock_code = stock.stock_code"

    msql.query(sql, idx, (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log(data);
            res.send({result: data})
        }
        res.end()
    })
})

router.post('/kospi', (req, res) => {
    var url = 'https://fchart.stock.naver.com/sise.nhn?symbol=kospi&timeframe=day&count=1&requestType=0';
    var request = require('request');
    const convert = require('xml-js');
    request.get(url, function (error, response, body) {
        if(error) {
            console.log(error)
        }else{
            var json = convert.xml2js(body, {compact: true, spaces: 4})
            var ss = json.protocol.chartdata.item
            res.send(ss);
        }
   });
})

router.post('/kosdaq', (req, res) => {
    var url = 'https://fchart.stock.naver.com/sise.nhn?symbol=kosdaq&timeframe=day&count=1&requestType=0';
    var request = require('request');
    const convert = require('xml-js');
    request.get(url, function (error, response, body) {
        if(error) {
            console.log(error)
        }else{
            var json = convert.xml2js(body, {compact: true, spaces: 4})
            var ss = json.protocol.chartdata.item
            res.send(ss);
        }
   });
})

module.exports = router;