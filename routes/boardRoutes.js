const express = require('express');
const router = express.Router();
const path = require('path');
const { db, sequelize } = require('../models/index');
const { Op } = require('sequelize');

const boardController = require('../controllers/boardController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel, setCondition, storeUrl } = require('./middlewares');

// try문 제대로 동작시, 
    // storeUrl
// error 시 ==>
    // const previousUrl = req.session.previousUrl || '/';
    // res.redirect(previousUrl);

router.get("/",storeUrl, setDBModel(db.post), getPaginationInfo, boardController.showBoardPage); //, storeUrl,);

// router.get("/test", boardController.checkWriter);

router.get("/post", storeUrl, setDBModel(db.post_comment), getPaginationInfo, boardController.getCommentInfo, boardController.showPost);
// router.post("/post", isLoggedIn, boardController.setLike);//test 좋아요 누르면 해당 처리 페이지로 갔다가 이전 페이지로 리디렉션
//⚠️
router.get("/write", isLoggedIn, boardController.showWritePage);
router.post("/write", isLoggedIn, boardController.writePost);

// 작성자 체크
// router.get("/update", isLoggedIn, boardController.showUpdatePage);
router.get("/update", isLoggedIn, boardController.checkWriter, boardController.showUpdatePage);
router.post("/update", isLoggedIn, boardController.updatePost);
// 작성자 체크
router.get("/delete", isLoggedIn, boardController.checkWriter, boardController.deletePost);

router.post("/like", isLoggedIn, boardController.setLike);
// router.post("/newComment", isLoggedIn, boardController.getCommentInfo, );
// router.post("/newComment", (req,res)=>{
//     console.log('클라이언트 값 확인 content', req.body.content);
//     res.json({success:true, content: req.body.content});
// })
router.post("/newComment", boardController.createComment, setDBModel(db.post_comment), getPaginationInfo, boardController.getCommentInfo, boardController.showComment);
router.get("/getComment", setDBModel(db.post_comment), getPaginationInfo, boardController.getCommentInfo, boardController.sendComment);
// router.get("/getComment", (req, res)=>{
//     console.log('이건 되긴해?');
// })
// 삭제

// 게시판 종류별 라우팅
router.get("/:category", storeUrl, boardController.checkBoard, setDBModel(db.post), getPaginationInfo, boardController.showBoardPage);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);
//  setCondition({category:restaurant}),
// router.get("/board", boardController.showBoard);

module.exports = router;

// https://velog.io/@kon6443/NodeJS-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B5%AC%ED%98%84-1-MySQL-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%9E%91%EC%84%B1