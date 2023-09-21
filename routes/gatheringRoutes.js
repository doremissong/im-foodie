const express=require('express');
const router = express.Router();
const gatheringController = require('../controllers/gatheringController');
const chatController = require('../controllers/chatController');
const { isNotLoggedIn, isLoggedIn} = require('./middlewares');

// /chat
router.get("/", (req, res) => {
    console.log(req.query.roomId, '는 roomId');
    res.render("chat", { currentUser: req.user.mem_id, roomId: req.query.roomId });//ㅆ발 post로 했는데 왜 getdmfh rksirh
})

router.get("/list", isLoggedIn, gatheringController.showChatList);

router.post("/list", isLoggedIn, /*gatheringController.checkMember,*/ gatheringController.selectRoom);

// router.get("/room", isLoggedIn, gatheringController.checkMember, gatheringController.showChatRoom);
// post로만 들어오게
router.post("/room", isLoggedIn, gatheringController.checkMember, gatheringController.selectRoom);




module.exports = router;
