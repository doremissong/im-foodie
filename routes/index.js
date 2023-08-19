const express = require('express');
const router = express.Router();
const passport = require('passport'); // 이것도 config/passport로 바꿔야하나
const authRoutes = require('./authRoutes');
const gatheringRoutes = require('./gatheringRoutes');

const path = require('path');
// const { db } = require('../models/index');
const memberController = require('../controllers/memberController');
const boardController = require('../controllers/boardController');
const errorController = require('../controllers/errorController');
const chatController = require('../controllers/chatController');
const { isLoggedIn } = require('./middlewares');

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
// router.get("/chat/select", isLoggedIn, (req, res)=>{
//   res.render("selectChatRoom", {currentUser: req.user.mem_id});
// });

// 채팅 테스트
router.get("/test_post/", (req, res)=>{
  res.render("test");
})

router.post("/test_post/", (req,res)=>{
  console.log(req.body.roomId);
})
router.get("/member/chatlist", isLoggedIn, (req, res) => {
  // 그룹 선택.
  res.render("chatList");
});
router.post("/member/chatlist", isLoggedIn, (req, res)=>{
  console.log('hihi hungry');
})
router.get("/chat", (req, res)=>{
  console.log(req.query.roomId,'는 roomId');
  res.render("chat", {currentUser:req.user.mem_id, roomId:req.query.roomId} );//ㅆ발 post로 했는데 왜 getdmfh rksirh
  
})
// 방 입장. 근데 이 방에 들어올 수 있는지. participant에 현재 모임 id랑 mem_id로 검색 결과가 있어야 권한 있는 것.
router.get("/chat/:id", isLoggedIn, (req, res)=>{
  // console.log(`gathering_id : ${req.params.gathering_id}`);
  res.render("chat", {currentUser:req.user.mem_id, roomId:req.params.id} );
})


// 라우터 분리
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


// (req, res, next) => {
//   if (req.session.user === undefined) {
//     res.send(alertMove('/user/login', '로그인 후 이용가능합니다.'));
//   } else {
//     next();
//   }
// };