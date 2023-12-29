const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const authRoutes = require('./authRoutes');
const gatheringRoutes = require('./gatheringRoutes');
const boardRoutes = require('./boardRoutes');
const recipeRoutes = require('./recipeRoutes');
const myroomRoutes = require('./myroomRoutes');
const noticeRoutes = require('./noticeRoutes');

const path = require('path');
// const { db } = require('../models/index');
const memberController = require('../controllers/memberController');
const boardController = require('../controllers/boardController');
const errorController = require('../controllers/errorController');
const chatController = require('../controllers/chatController');
const { isLoggedIn } = require('./middlewares');

router.get("/", (req, res) => {
  res.render("index", {user: req.user});
});

router.get("/members", memberController.show, memberController.showView);


// 라우터 분리
router.use("/auth/", authRoutes);
router.use("/board", boardRoutes);
router.use("/gather",gatheringRoutes);
router.use("/recipe", recipeRoutes);         // 레시피 열람, 작성, 
router.use("/myroom", myroomRoutes);         // 마이룸 - 냉장고, 활동내역(댓글, 좋아요, 모임 등), 개인정보 수정, 탈퇴
router.use("/notice", noticeRoutes);        // 공지사항

// ERROR
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);


module.exports = router;

//routes 정리 예시
// https://github.com/jaab30/passport_mysql_sequelize_boiler_plate/tree/master/routes
