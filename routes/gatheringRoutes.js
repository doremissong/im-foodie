const express=require('express');
const router = express.Router();
const { db, sequelize } = require("../models/index");
const gatheringController = require('../controllers/gatheringController');
const chatController = require('../controllers/chatController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, setDBModel, getPaginationInfo } = require('./middlewares');
const { get } = require('../config/email');

// 1) 밥모임 메인
router.get("/", gatheringController.showGatheringMainPage);

// countperpage=9. state=0 모집중, state=1 모집 완료
router.get("/completed", setDBModel(db.post), getPaginationInfo, gatheringController.getCompletedList);
router.get("/recruiting", setDBModel(db.post), getPaginationInfo, gatheringController.getRecruitingList);
// //test
router.get("/test", (req, res)=>{
    res.render("gatherMain");
})

router.get("/test2", gatheringController.test2);

// 2) 모집중 목록
// router.get("/recruiting", setDBModel(db.gathering), getPaginationInfo, gatheringController.getRecruitingList);

// 3) 모집완료 목록
// router.get("/completed", setDBModel(db.gathering), getPaginationInfo, gatheringController.getCompletedList);

// 4) 나의 밥모임 목록
router.get("/joined", isLoggedIn, gatheringController.showJoinedPage);
router.get("/imade", isLoggedIn, gatheringController.showIMadePage);

// 5) 밥모임 생성
router.get("/create", isLoggedIn, gatheringController.showCreatePage);

// 6) 밥모임 신청하기
// router.get("/apply", isLoggedIn, gatheringController.showGatherApplyPage);
router.post("/apply", isLoggedIn, gatheringController.applyForGathering);

// 7) 밥모임 상세 페이지
router.get("/details", gatheringController.showGatheringDetail);

// 8) 방장의 멤버 목록  ⚠️멤버 목록을 멤버도 볼 수 있어야해. 그 컨트롤러 함수를 만들어서 여기저기 이용하는게 나을 듯
// router.get("/memberlist", (req,res)=>{res.send(req.query.gatheringId)});
router.get("/memberlist", gatheringController.showMemberOfGathering);

// /chat 채팅
// router.get("/chat", (req, res) => {
//     console.log(req.query.roomId, '는 roomId');
//     res.render("chat", { currentUser: req.user.mem_id, roomId: req.query.roomId });//ㅆ발 post로 했는데 왜 getdmfh rksirh
// })

// 1) 채팅 목록
router.get("/chat/list", isLoggedIn, gatheringController.showChatList);

// 2) 채팅 선택
router.post("/chat/list", isLoggedIn, /*gatheringController.checkMember,*/ gatheringController.selectRoom);
// router.get("/room", isLoggedIn, gatheringController.checkMember, gatheringController.showChatRoom);
// post로만 들어오게
router.get("/chat/room", isLoggedIn, /*gatheringController.checkMember, */ gatheringController.selectRoom);
router.post("/chat/room", isLoggedIn, /*gatheringController.checkMember, */ gatheringController.selectRoom);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;
