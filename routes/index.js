const express = require('express');
const router = express.Router();
const passport = require('passport'); // 이것도 config/passport로 바꿔야하나
const authRoutes = require('./authRoutes');
const gatheringRoutes = require('./gatheringRoutes');
const boardRoutes = require('./boardRoutes');
const recipeRoutes = require('./recipeRoutes');
const myroomRoutes = require('./myroomRoutes');
// const manageRoutes = require('./manageRoutes');
const noticeRoutes = require('./noticeRoutes');
// FAQ & QNA 컨트롤러

const path = require('path');
// const { db } = require('../models/index');
const memberController = require('../controllers/memberController');
const boardController = require('../controllers/boardController');
const errorController = require('../controllers/errorController');
const chatController = require('../controllers/chatController');
// const recipeController = require("../controllers/recipeController");
// const myroomController = require("../controllers/myroomController");
// const manageController = require("../controllers/manageController");
// const noticeController = require("../controllers/noticeController");
// FAQ | QNA 컨트롤러
const { isLoggedIn } = require('./middlewares');

router.get("/", (req, res) => {
  console.log("지울것index.js - main - [req.session]: ", req.session);
  res.render("index", {user: req.user});
});

router.get("/members", memberController.show, memberController.showView);
// router.get("/myroom/edit", memberController.edit);   //controller에서 update 수정
// router.post("/myroom/edit", memberController.updateMemberInfo, memberController.showView);//showView
// router.get("/delete", memberController.showDelete);
// router.post("/delete", memberController.deleteMember, memberController.show, memberController.showView);


// 라우터 분리
router.use("/auth/", authRoutes);
router.use("/board", boardRoutes);
router.use("/gather",gatheringRoutes);
router.use("/recipe", recipeRoutes);         // 레시피 열람, 작성, 
router.use("/myroom", myroomRoutes);         // 마이룸 - 냉장고, 활동내역(댓글, 좋아요, 모임 등), 개인정보 수정, 탈퇴
// router.use("/manage", manageRoutes);         // 관리자 페이지 - 글(버튼; 게시판, 레시피, 모임, 공지사항, 질의응답) 삭제,
router.use("/notice", noticeRoutes);        // 공지사항
// router.use("/qna아니면faq");              //자주묻는질문? 질의응답?

// ERROR
// router.use("/", errorRoutes);
// router.use("/")
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
