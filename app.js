"use strict";

const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');

//controller -->index.js이용
const errorController = require('./controllers/errorController');
const homeController = require('./controllers/homeController');
const memberController = require('./controllers/memberController');

const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// const expressValidator = require('express-validator');
const passport = require('passport');
// const Localstrategy = require('passport-local').Strategy;
const passportConfig = require('./config/passport');

//router
const app = express();
const router = express.Router();
const authRouter = require('./routes/auth')(app);   //라우터 연결 안되다가 왜 갑자기 되는걸까? 바뀐 게 없느데 위치 바꾸려다가 효과 없었고,, 뭘까

// 공통 미들웨어
router.use(expressLayouts);
router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.urlencoded({ extended: false })); //false, true 정확한 차이는 무엇일까?
router.use(bodyParser.json());
router.use(morgan('dev')); //요청 method, url, 상태, 응답시간 보여줌

router.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser를 미들웨어로 사용하도록 설정// read cookies (needed for auth)
router.use(expressSession({
    secret: process.env.COOKIE_SECRET,  // 환경변수에 숨기고 저장하는 거 8부에소 볼 수 있어
    resave: false,              // 새로운 요청시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: true,    // 세션에 저장할 내용이 없어도 저장할지 설정
    cookie: {
        httpOnly: true,     //로그인 구현시 필수 적용. js로 접근 x 기능
        secure: false,  // true는 https 일때
        maxAge: 4000000
        //store: 
    },
}));  // cookie-parser 사용 위해 express-session에 설정?

passportConfig;
//passport 미들웨어
router.use(passport.initialize()); //passport 사용 및 초기화. 
router.use(passport.session());    //passport session 연동. express세션을 내부적으로 사용. req.session에 passport 관련 정보 저장.
                                //passport에게 session을 사용하도록 함 // persistent login session
// setting 포트 설정
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");


// const authRouter = require('./routes/auth')(app);
// 라우팅
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/main.html"));
});

router.get("/members", memberController.show, memberController.showView);
router.get("/myroom/edit", memberController.edit);   //controller에서 update 수정
router.post("/myroom/edit", memberController.update, memberController.showView);//showView
router.get("/delete", memberController.showDelete);
router.post("/delete", memberController.delete, memberController.show, memberController.showView);
router.get("/logout", memberController.logout);
// router.post("/auth/login", memberController.authenticate);
// router.post("/auth/login", passport.authenticate("local", {
//     failureRedirect: "/auth/login",
//     successRedirect: "/",
// }));

app.use("/auth", authRouter);
app.use("/", router);//라우터 객체를 app객체에 등록

// error
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

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