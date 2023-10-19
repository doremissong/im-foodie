const express=require('express');
const router = express.Router();
const gatheringController = require('../controllers/gatheringController');
const chatController = require('../controllers/chatController');
const { isNotLoggedIn, isLoggedIn} = require('./middlewares');



router.get("/", gatheringController.showGatheringList);
router.get("/recruiting", gatheringController.showRecruitingPage);
router.get("/completed", gatheringController.showCompletedPage);
router.get("/joined", isLoggedIn, gatheringController.showJoinedPage);
router.get("/imade", isLoggedIn, gatheringController.showIMadePage);
router.get("/create", isLoggedIn, gatheringController.showCreatePage);
router.get("/apply", isLoggedIn, gatheringController.showGatherApplyPage);
router.post("/apply", isLoggedIn, gatheringController.applyForGathering);
router.get("/details", gatheringController.showGatheringDetail);
// router.get("/memberlist", (req,res)=>{res.send(req.query.gatheringId)});
router.get("/memberlist", gatheringController.showMemberOfGathering);

// /chat
router.get("/chat", (req, res) => {
    console.log(req.query.roomId, '는 roomId');
    res.render("chat", { currentUser: req.user.mem_id, roomId: req.query.roomId });//ㅆ발 post로 했는데 왜 getdmfh rksirh
})
router.get("/chat/list", isLoggedIn, gatheringController.showChatList);

router.post("/chat/list", isLoggedIn, /*gatheringController.checkMember,*/ gatheringController.selectRoom);
// router.get("/room", isLoggedIn, gatheringController.checkMember, gatheringController.showChatRoom);
// post로만 들어오게
router.get("/chat/room", isLoggedIn, /*gatheringController.checkMember, */ gatheringController.selectRoom);
router.post("/chat/room", isLoggedIn, /*gatheringController.checkMember, */ gatheringController.selectRoom);





module.exports = router;
