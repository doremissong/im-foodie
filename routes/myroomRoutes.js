const express = require('express');
const router = express.Router();
const { db, sequelize } = require('../models/index');

const myroomController = require('../controllers/myroomController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel } = require('./middlewares');

// 1) 메인 - 활동내역(좋아요, 글, 레시피, 모임 ) + 개인정보 수정/탈퇴 + 
/* 💚 to do list
    1) 레시피 관련 함수 생성(3)
        - 작성한 레시피
        - 좋아요 누른 레시피
        - 댓글 단 레시피 // [추후] 4) 최근 본 레시피
    2) 게시글 관련 함수 생성(3)
        - 작성한 게시글
        - 좋아요 누른 게시글
        - 댓글 단 게시글 // [추후] 4) 최근 본 게시글
    3) 밥모임 관련 함수 생성(3)
        - 내가 만든 밥모임
        - 내가 가입한 밥모임
        - 채팅목록 보여주기
    ⚠️ 1,2,3번은 재사용할 함수
    4) 개인정보 - 버튼만, 이어질 화면만 만들면 됨.
        - 개인정보 수정 화면
        - 회원 탈퇴
    5) 알림
        - 채팅 알림
        - 밥모임(방장) - 신청 알림, 자발적 탈퇴시 알림
        - 밥모임(일반) - 신청 수락,거절 결과 알림, 모임 삭제 시 알림
        - ❌`게시글 댓글 알림, 좋아요알림
        - ❌레시피 댓글 알림, 좋아요알림
    6) 문의내역 ( 할지 안할지 모름)
        - 작성한 문의내역 가져오기
        - 

*/
router.get("/", myroomController.showMain);
// 1) 레시피 부문
// 2) 게시글 부문
// 3) 밥모임 부문
// 3) 알림,(채팅알림) 
// 4) 문의내역/문의하기
// 5) 개인정보(member)
//     회원정보 수정
//     프로필사진/자기소개 변경
//     로그아웃
//     고객센터

// 레시피 - 1) 작성한 레시피 2) 좋아요 누른 레시피 3) 댓글 단 레시피 // [추후] 4) 최근 본 레시피
router.get("/recipe", isLoggedIn, myroomController.showRecipeDetail);

// 게시글 - 1) 작성글 2) 좋아요 누른 게시글 목록 3) 댓글 작성한 게시글 // [추후] 4) 최근 본 글
router.get("/board", isLoggedIn, myroomController.showBoardDetail);

// 밥모임 - 1) 내가 만든 밥모임 2) 내가 가입한 밥모임 3) 채팅목록
router.get("/gather", isLoggedIn, myroomController.showGatherDetail);

//  알림 - 채팅알림(일단 채팅만 알림 이ㅓ것도 문제야), 공지사항 알림, 
router.get("/alim", isLoggedIn, myroomController.showNotification);


// 유저정보 - 1) 개인정보 수정 2) 탈퇴 3) 
router.get("/member", isLoggedIn, myroomController.showMemberDetail);
// 목록 - 
router.get("/member/update", isLoggedIn, myroomController.showUpdateMemberInfo);
router.post("/member/update", isLoggedIn, myroomController.updateMemberInfo);

router.post("/member/close", isLoggedIn, myroomController.closeAccount);    // 팝업 띄우기

// 문의사항 1) 작성한 문의사항 [답변대기 / 답변완료 ] 옆에 표시
router.get("/qna", isLoggedIn, myroomController.showQnaDetail);

// // 설정
// router.get("/setting", isLoggedIn, myroomController.showSetting);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;