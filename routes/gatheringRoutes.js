const express=require('express');
const router = express.Router();
const { db, sequelize } = require("../models/index");
const gatheringController = require('../controllers/gatheringController');
const chatController = require('../controllers/chatController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, setDBModel, getPaginationInfo, storeUrl } = require('./middlewares');
const { get } = require('../config/email');

// 1) 밥모임 메인 ✅
router.get("/", storeUrl, gatheringController.showMainGatherPage);

// 2) 밥모임 C_UD ✅
router.get("/create", isLoggedIn, gatheringController.showCreatePage);
router.post("/create", isLoggedIn, gatheringController.createGather);
// ⚠️지역 기본값 설정 안됨
router.get("/update", isLoggedIn, gatheringController.showUpdatePage);
router.post("/update", isLoggedIn, gatheringController.updateGather);

router.get("/delete", isLoggedIn, gatheringController.deleteGather);


// countperpage=9. state=0 모집중, state=1 모집 완료
// 2) 모집중 목록
// router.get("/completed", storeUrl, setDBModel(db.gathering), getPaginationInfo, gatheringController.showCompletedList);
router.get("/completed", storeUrl, setDBModel(db.gathering), getPaginationInfo, gatheringController.showCertainList);
// 3) 모집완료 목록
// router.get("/recruiting", storeUrl, setDBModel(db.gathering), getPaginationInfo, gatheringController.showRecruitingList);
router.get("/recruiting", storeUrl, setDBModel(db.gathering), getPaginationInfo, gatheringController.showCertainList);

// 4) 나의 밥모임 목록
router.get("/mine", isLoggedIn, storeUrl, /*밥모임설정스 */gatheringController.showMyGatherList);
                                        // ㄴ participant에서 memId로 검색해서, recipe_id랑 state를 가져와
                                        // ㄴ order: ['updateAt', 'ASC']
                                        // ㄴ state로 group . group에 limit 가능??
                                        //  ( group by로 묶어서 5개씩만 가져올 수 있나?) 안됨 따로 따로 가져와야함.
// 4) - 내가 만든 모임
// router.get("/imade", isLoggedIn, gatheringController.findGatheringId, setDBModel(db.gathering), getPaginationInfo, gatheringController.showIMadePage);
router.get("/imade", isLoggedIn, storeUrl, gatheringController.findGatheringId, setDBModel(db.gathering), getPaginationInfo, gatheringController.showCertainList);

// 4) - 내가 참여한 모임
// router.get("/joined", isLoggedIn, gatheringController.findGatheringId, setDBModel(db.gathering), getPaginationInfo, gatheringController.showJoinedPage);
router.get("/joined", isLoggedIn, storeUrl, gatheringController.findGatheringId, setDBModel(db.gathering), getPaginationInfo, gatheringController.showCertainList);

// 4) - 신청한 모임
// router.get("/applied", isLoggedIn, gatheringController.findGatheringId, setDBModel(db.gathering), getPaginationInfo, gatheringController.showIAppliedPage);
router.get("/applied", isLoggedIn, storeUrl, gatheringController.findGatheringId, setDBModel(db.gathering), getPaginationInfo, gatheringController.showCertainList);


// 7) 밥모임 상세 페이지
router.get("/view", storeUrl, gatheringController.showView);

// 6) 밥모임 신청하기
router.post("/apply", isLoggedIn, gatheringController.applyForGather);
router.get("/acceptMember", isLoggedIn, gatheringController.acceptMember);
router.get("/refuseMember", isLoggedIn, gatheringController.refuseMember);
router.get("/banMember", isLoggedIn, gatheringController.banMember);


// 1) 채팅 목록
router.get("/chat/list", isLoggedIn, gatheringController.showChatList);

// 2) 채팅 선택
router.get("/chat/room", isLoggedIn, gatheringController.checkMember, gatheringController.selectRoom);
// router.post("/chat/list", isLoggedIn, gatheringController.checkMember, gatheringController.selectRoom);
// router.get("/room", isLoggedIn, gatheringController.checkMember, gatheringController.showChatRoom);
// post로만 들어오게
// router.post("/chat/room", isLoggedIn, gatheringController.checkMember, gatheringController.selectRoom);

// //test
// router.get("/test", gatheringController.checkMember);

// router.get("/test2", gatheringController.test2);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;
