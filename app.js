"use strict";

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const router = express.Router();

//controller
const errorController = require('./controllers/errorController');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const memberController = require('./controllers/memberController');

const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');


const ejs = require('ejs');
//db test
// ./models/index.js에서 설정한 연결된 모델들을 가져온다
const { member } = require('./models/member');
const db = require('./models');


// setting
app.set("port", process.env.PORT||3000);
app.set("view engine", "ejs");


router.use(expressLayouts);
router.use(express.static('public'));
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.use(cookieParser("secret_passcode")); // cookie-parser를 미들웨어로 사용하도록 설정
router.use(expressSession({
    secret: "secret_password",  // 환경변수에 숨기고 저장하는 거 8부에소 볼 수 있어
    cookie: {
        maxAge:4000000
    },
    resave: false,
    saveUninitialized: false
})
);  // cookie-parser 사용 위해 express-session에 설정?
router.use(connectFlash()); // connect-flash를 미들웨로 사용 위해 앱 설정
/*
const test = async ()=>{
    console.log('hih');
    const _member = await db.member.findAll({
        where:{mem_sq: 1}
    });
    console.log(_member);
}
test();
*/

// methodOverrid??뭐지? https://github.com/JonathanWexler/get-programming-with-nodejs/blob/master/unit_5/lesson_25_capstone/finish/confetti_cuisine/main.js


// 라우팅
router.get("/",(req, res)=>{
    //res.send("This is I'm FOODIE 🍴");
    res.render("index");
    //res.render("member-register");
})
router.get("/courses", homeController.showCourses);    // courses page
router.get("/contact", userController.getSingUpPage);     // contact 연락처 페이지
//app.post("/contact", userController.saveUser);     // 연락처 제출 양식 위한 라우트
router.get("/users", userController.getAllUsers,
    (req,res,next)=>{ // getAllUsers로 요청 전달
    console.log(req.data);  // 요청 객체로부터의 데이터 로깅
    res.send(req.data); // 브라우저에 데이터 렌더링. 그저 텍스트만
});
router.get("/signup", memberController.getSignUpPage);
router.post("/signup", memberController.saveUser);
    //왜 자꾸 /login했는데 저기로 가냐고 /contact
//error가 나는데 그게 /contact로 넘억말 
// ejs에서 /contact로 되어있었음.

router.get("/login", memberController.getSignUpPage);
router.post("/login", memberController.saveUser);

// error
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

//
app.use("/", router);

// 
app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
})
