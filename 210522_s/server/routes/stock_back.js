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
    })
})

module.exports = router;