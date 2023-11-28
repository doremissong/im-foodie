const express = require('express');
const router = express.Router();
const path = require('path');
const { db, sequelize } = require('../models/index');
const { Op } = require('sequelize');

const boardController = require('../controllers/boardController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel, setCondition } = require('./middlewares');

router.get("/", setDBModel(db.post), getPaginationInfo, boardController.showPage);

router.get("/write", isLoggedIn, (req, res)=>{
    res.render("boardWrite", {user: req.user});
    // res.sendFile(path.join(__dirname, "../public/html/board_write.html"));
});
router.get("/post", setDBModel(db.post_comment), getPaginationInfo, boardController.getCommentInfo, boardController.showPost);
// router.post("/post", isLoggedIn, boardController.setLike);//test 좋아요 누르면 해당 처리 페이지로 갔다가 이전 페이지로 리디렉션
//⚠️
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
router.post("/write", isLoggedIn, boardController.writePost);
// router.get("/:page", boardController.showBoard);

// 게시판 종류별 라우팅
router.get("/:category", boardController.checkBoard, setDBModel(db.post), getPaginationInfo, boardController.showPage);

// 삭제
router.get("/delete", isLoggedIn, async(req, res)=>{
    //
    if (!req.user) {
        // 로그인 상태 아니면
        // res.redirect(res.locals.history);
        console.log('로그인 상태 확인');
        res.redirect('/board');
        // res.redirect(res.locals.history);
    }
    const memId = req.user.mem_id;
    // query no있는지 체크
    if (!res.query.no) {
        console.log("There's no number of post to delete");
        res.redirect('/board');
        // res.redirect(res.locals.history);
    }
    const postNo = req.query.no;
    //작성자가 맞는지 체크
    try {
        const recipeWriter = await db.post.findOne({
            attributes: ['writer_id'],
            where: {
                post_id: postNo,
            }
        })
        // recipeWriter.writer_id 제대로 동작할까?
        if (memId == postWriter.writer_id) {
            console.log('로그인한 사용자:', memId, '글의 작성자: ', postWriter.writer_id);
            next();
        }
    } catch (err) {
        console.log('[ERROR]: while checking if user is the writer of the post', err);
        res.redirect('/board');
        // res.redirect(res.locals.history);
    }

    // 글 삭제
    try {
        await sequelize.transaction(async t => {
            await db.post.destroy({
                where: { post_no: postNo },
                transaction: t,
            })
        })
    } catch (err) {
        console.log('[ERROR] While deleting a post.', err);
        res.redirect('/board');
        // res.redirect(res.locals.history);
    }
});

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);
//  setCondition({category:restaurant}),
// router.get("/board", boardController.showBoard);

module.exports = router;

// https://velog.io/@kon6443/NodeJS-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B5%AC%ED%98%84-1-MySQL-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%9E%91%EC%84%B1