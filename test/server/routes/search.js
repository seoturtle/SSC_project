const express = require('express');
const router = express.Router();
const db = require('./db');
const cors = require('cors');

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
        db.query(sql, param, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.send({result: data});
        }
    })}
})

module.exports = router;