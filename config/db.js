require('dotenv').config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const mysql = require('mysql2');

// pool 생섣ㅇ
const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit : 5 // 5번??
});

//모듈화
exports.getConnectionPool = (callback) =>{
    pool.getConnection((err, conn)=>{
        if(err) throw err;
        callback(conn);
    })
}

