const express = require('express');
const router = express.Router();
const { db, sequelize } = require('../models/index');

const noticeController = require('../controllers/noticeController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, checkAdmin, getPaginationInfo, setDBModel, storeUrl } = require('./middlewares');

// 1) 공지사항 메인 화면
router.get("/", storeUrl, checkAdmin, setDBModel(db.notice), getPaginationInfo, noticeController.showMainPage);
// 공지사항 데이터 보여주고 , 페이지네이션

// 2. 글 열람 /view?ntc_no=
router.get("/view", storeUrl, checkAdmin, noticeController.showNotice);

// 3. 글 작성
router.get("/write", checkAdmin, noticeController.showWritePage);
router.post("/write", checkAdmin, noticeController.createNotice);

// 4. 글 수정
router.get("/update", checkAdmin, noticeController.showUpdatePage);
router.post("/update", checkAdmin, noticeController.updateNotice);

// 5. 글 삭제
router.get("/delete", checkAdmin, noticeController.deleteNotice);

/*
6) 관리자 입장에서 삭제 수정 버튼, 작성버튼 어떻게
관리자 페이지에서 접근해야할까
아님 공지사항 페이지에서 접근해야할까
*/

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);


module.exports = router;