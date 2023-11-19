const express = require('express');
const router = express.Router();
const { db, sequelize } = require('../models/index');

const myroomController = require('../controllers/myroomController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel } = require('./middlewares');

// 1) 메인 - 활동내역(좋아요, 글, 레시피, 모임 ) + 개인정보 수정/탈퇴 + 

router.get("/", myroomController.showMain);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;