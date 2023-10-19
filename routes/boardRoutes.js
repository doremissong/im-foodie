const express = require('express');
const router = express.Router();
const path = require('path');
const {db, sequelize}=require('../models/index');

const boardController = require('../controllers/boardController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel, setCondition } = require('./middlewares');

router.get("/", setDBModel(db.post), getPaginationInfo, boardController.showPage);
router.get("/write", isLoggedIn, (req, res)=>{
    res.render("boardWrite", {user: req.user});
    // res.sendFile(path.join(__dirname, "../public/html/board_write.html"));
});
router.get("/post", boardController.showPost);
router.post("/write", isLoggedIn, boardController.writePost);
router.get("/:page", boardController.showBoard);
router.get("/boast", boardController.showBoard);
router.get("/restaurant", boardController.showBoard);
router.get("/tip", boardController.showBoard);
router.get("/free", boardController.showBoard);
router.get("/notgood", boardController.showBoard);
router.get("/promotion", boardController.showBoard);
router.get("/share", boardController.showBoard);
router.get("/mealfriend", boardController.showBoard);


//  setCondition({category:restaurant}),
// router.get("/board", boardController.showBoard);

module.exports = router;

// https://velog.io/@kon6443/NodeJS-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B5%AC%ED%98%84-1-MySQL-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%9E%91%EC%84%B1