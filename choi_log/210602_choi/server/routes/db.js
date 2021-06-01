const mysql = require('mysql');
const db = mysql.createPool({
    host : 'ec2-15-164-94-207.ap-northeast-2.compute.amazonaws.com',
    user : 'ssc',
    password : 'qwe123!@#',
    database : 'ssc'
});

module.exports = db;
