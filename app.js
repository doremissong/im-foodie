"use strict";

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
//onst cors = require('cors');

const { sequelize } = require('./models/index');


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

const app = express();
const router = express.Router();

// setting
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
// cors 관련 없는 듯.
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));


router.use(expressLayouts);
router.use(express.static('public'));
//body0-parser는 express의 node_modules에 들어있다.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(cookieParser("secret_passcode")); // cookie-parser를 미들웨어로 사용하도록 설정
router.use(expressSession({
    secret: "secret_password",  // 환경변수에 숨기고 저장하는 거 8부에소 볼 수 있어
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
})
);  // cookie-parser 사용 위해 express-session에 설정?
router.use(connectFlash()); // connect-flash를 미들웨로 사용 위해 앱 설정

//db연결
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database: ', err);
//     });

// 라우팅
router.get("/", (req, res) => {
    //res.send("This is I'm FOODIE 🍴");
    //res.render("index");
    res.sendFile(__dirname + "/public/main.html");
    //res.send("hihi");
})
router.get("/courses", homeController.showCourses);    // courses page
router.get("/contact", userController.getSignUpPage);     // contact 연락처 페이지
router.get("/signup",
    memberController.getSignUpPage
    // (req,res)=>{
    //     res.sendFile(__dirname+'/public/html/signup.html')
    // }
);
router.post("/signup", memberController.saveUser);



app.use("/", router);//라우터 객체를 app객체에 등록
// error
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);


// 
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
})


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