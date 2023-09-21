const express = require('express');
const router = express.Router();
const path = require('path');

const boardController = require('../controllers/boardController');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

router.get("/", boardController.showFirstPage);
router.get("/write", isLoggedIn, (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/html/board_write.html"));
});
router.post("/write", isLoggedIn, boardController.writePost);

router.get("/:page", boardController.showBoard);

// router.get("/board", boardController.showBoard);

module.exports = router;

// https://velog.io/@kon6443/NodeJS-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B5%AC%ED%98%84-1-MySQL-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%9E%91%EC%84%B1