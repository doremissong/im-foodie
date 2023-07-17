"use strict";

const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// const expressValidator = require('express-validator');
const passport = require('passport');

//router
const app = express();
const router = require('./routes/index');
require('./config/passport')(passport);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// 공통 미들웨어 -다 router였음
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false })); //false, true 정확한 차이는 무엇일까?
app.use(bodyParser.json());
app.use(morgan('dev')); //요청 method, url, 상태, 응답시간 보여줌

app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser를 미들웨어로 사용하도록 설정// read cookies (needed for auth)
app.use(expressSession({
    secret: process.env.COOKIE_SECRET,  // 환경변수에 숨기고 저장하는 거 8부에소 볼 수 있어
    resave: false,              // 새로운 요청시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: false,    // 세션에 저장할 내용이 없어도 저장할지 설정
    cookie: {
        httpOnly: true,     //로그인 구현시 필수 적용. js로 접근 x 기능
        // secure: false,  // true는 https 일때
        maxAge: 4000000
        //store: 
    },
}));  // cookie-parser 사용 위해 express-session에 설정?
app.use(passport.initialize()); //passport 사용 및 초기화. 
app.use(passport.session());    //passport session 연동. express세션을 내부적으로 사용. req.session에 passport 관련 정보 저장.
                                //passport에게 session을 사용하도록 함 // persistent login session

app.use("/", router);//라우터 객체를 app객체에 등록

// 
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
})


// methodOverrid??뭐지? https://github.com/JonathanWexler/get-programming-with-nodejs/blob/master/unit_5/lesson_25_capstone/finish/confetti_cuisine/main.js


// ensureAuthenticated!!!!!

// app.get('/login_success', ensureAuthenticated, function(req, res){
//     res.send(req.user);
//    // res.render('users', { user: req.user });
// });

// function ensureAuthenticated(req, res, next) {
//     // 로그인이 되어 있으면, 다음 파이프라인으로 진행
//     if (req.isAuthenticated()) { return next(); }
//     // 로그인이 안되어 있으면, login 페이지로 진행
//     res.redirect('/login.html');
// }