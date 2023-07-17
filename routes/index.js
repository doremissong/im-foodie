const express = require('express');
const router = express.Router();
const passport = require('passport'); // 이것도 config/passport로 바꿔야하나
const authRoutes = require('./authRoutes');

const path = require('path');
// const { db } = require('../models/index');
const memberController = require('../controllers/memberController');
const boardController = require('../controllers/boardController');
const errorController = require('../controllers/errorController');

router.get("/", (req, res) => {
  console.log("main - [req.session]: ", req.session);
  // console.log("main - [req.user]: ", req.user);
  res.sendFile(path.join(__dirname, "../public/html/main.html"));
});

router.get("/members", memberController.show, memberController.showView);
router.get("/myroom/edit", memberController.edit);   //controller에서 update 수정
router.post("/myroom/edit", memberController.update, memberController.showView);//showView
router.get("/delete", memberController.showDelete);
router.post("/delete", memberController.delete, memberController.show, memberController.showView);
router.get("/board", boardController.showBoard);
router.get("/post/:post_id", (req, res, next)=>{
  res.json({title: req.params.post_id});
}); //요로코롬

router.get("/post", boardController.showPost);

router.use("/auth/", authRoutes);

// error
// router.use("/", errorRoutes);
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// router.get('/auth/logout', (req, res)=> {
//     console.log('[Before logout1]: ', req.user.mem_id);
//     // req.session.save((err) => {   //save 전에 destroy(); 
//     //     res.redirect('/');      //save는 session store에 저장
//     // });
//     req.logout(function (err) {
//         if (err) { console.log(err); }
//         console.log('[After logout1]');
//         res.redirect('/');
//     });
// });

module.exports = router;

//routes 정리 예시
// https://github.com/jaab30/passport_mysql_sequelize_boiler_plate/tree/master/routes

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

var isEmpty = function(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
      return true
    }else{
      return false
    }
  };

// (req, res, next) => {
//   if (req.session.user === undefined) {
//     res.send(alertMove('/user/login', '로그인 후 이용가능합니다.'));
//   } else {
//     next();
//   }
// };