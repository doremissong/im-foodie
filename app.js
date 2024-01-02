"use strict";

const express    = require('express');
const http       = require('http');
const app        = express();
const server     = http.createServer(app);
const cors       = require('cors');
const expressLayouts = require('express-ejs-layouts');
const path       = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan     = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const sharedSession = require('express-socket.io-session');

const passport = require('passport');
// const expressValidator = require('express-validator');
const router     = require('./routes/index');
require('./config/passport')(passport); //  Passport 설정을 포함하는 파일을 로드하고 해당 파일에 passport를 전달하는 코드
                                        // 이 코드는 주로 애플리케이션의 진입점 또는 서버를 시작하기 전에 실행되는 파일에 위치

app.set("port", process.env.PORT || 3000);  //전역변수 등록.
app.set('view engine', 'ejs');              // 전역변수 등록 app.set
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false })); //false, true 정확한 차이는 무엇일까?
app.use(bodyParser.json());
app.use(morgan('dev')); //요청 method, url, 상태, 응답시간 보여줌

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};
const sessionStore = new MySQLStore(options);
const sessionOptions = {
    secret: process.env.COOKIE_SECRET,  // 환경변수에 숨기고 저장하는 거 8부에소 볼 수 있어
    resave: false,              // 새로운 요청시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: true,    // 세션에 저장할 내용이 없어도 저장할지 설정
    //touchAfter: 24 * 60 * 60,
    store: sessionStore,
    cookie: {
        httpOnly: true,     //로그인 구현시 필수 적용. js로 접근 x 기능
        // secure: false,  // true는 https 일때
        expires: Date.now() + 1000 * 60 * 60,   //1H
        maxAge: 1000 * 60 * 60//4000000
    },
    rolling: true
};
const session = expressSession(sessionOptions);

app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser를 미들웨어로 사용하도록 설정// read cookies (needed for auth)
app.use(session);  // cookie-parser 사용 위해 express-session에 설정?
app.use(passport.initialize()); //passport 사용 및 초기화. 
app.use(passport.session());    //passport session 연동. express세션을 내부적으로 사용. req.session에 passport 관련 정보 저장.
                                //passport에게 session을 사용하도록 함 // persistent login session
// app.use(cors());
app.use("/", router);//라우터 객체를 app객체에 등록

//app.listen(app.get("port"), () => {
server.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`);
});
const io = require('socket.io')(server); // 위에서 server에 서버 인스턴스를 저장하고, socket.io에 인스턴스를 전달함.
// 444쪽. 앞으로 main.js에서 이를 사용하지 않을 것이므로 이 모듈을 상수로 저장할 필요는 없으며, 필요시 요청하면 된다. 이게 무슨 말이지?
// io.use(sharedSession(session));
// app.set('io', io);  //만자
// io.of('/chat').use(sharedSession(session)); //230803  네임스페이스로 req옮기기ㅠㅠㅠㅠ
io.use(sharedSession(session));
require('./controllers/chatController')(io);




// methodOverrid??뭐지? https://github.com/JonathanWexler/get-programming-with-nodejs/blob/master/unit_5/lesson_25_capstone/finish/confetti_cuisine/main.js

