const express = require('express');
const router = express.Router();
const msql = require('./db');
const cors = require('cors');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

router.post('/year18', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM year18 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/year19', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM year19 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/year20', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM year20 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/year20_01', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM quarter20_1 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/year20_02', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM quarter20_2 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/year20_03', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM quarter20_3 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})

router.post('/year20_04', (req,res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM quarter20_4 WHERE stock_code = ?"

    msql.query(sql, code, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            res.send({result: data})
        }
    })
})
    

module.exports = router;