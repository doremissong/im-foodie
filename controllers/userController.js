const pool = require('../config/db');

// const 
exports.getAllUsers = (req, res, next)=>{
    pool.getConnectionPool((conn)=>{
        const sql = 'SELECT * FROM user';
        conn.query(sql, (err, rows, fields)=>{
            if(err) next(err); // 에러를 미들웨어 함수로 전달
            res.render("users", {users:rows});
        })
        conn.release();
    })
}

exports.getSignUpPage = (req, res)=>{   //가입 페이지 렌더링 액션 추가
    res.render("contact");
}

exports.saveUser = async (req, res)=>{
    pool.getConnectionPool((conn)=>{
        const sql = 'INSERT INTO user(name, email, zipcode) VALUES (?,?,?)';
        conn.query(sql, [req.body.name, req.body.email, req.body.zipcode], (err, rows, fileds)=>{
            if(err) res.send(err);
            //console.log(rows.affectedRows);
            res.render("thanks");
        })
        conn.release();
    });
};
//await이랑 try catch문으로 