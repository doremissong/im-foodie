const express = require('express');
const router = express.Router();
const { db, sequelize } = require('../models/index');

const recipeController = require('../controllers/recipeController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel } = require('./middlewares');

// 1) 메인 레시피, 5위까지 + 추천
router.get("/", recipeController.showMainPage);

// ⚠️2) 전체 레시피 목록 - 시간순, 조회수순, 좋아요순, + 페이지네이션
router.get("/list", setDBModel(db.recipe), getPaginationInfo, recipeController.showRecipeListPage);
// ⚠️3) 특정 상황별 레시피 목록 ; 상황(category)별 전체, 시간, 인기순, + 페이지네이션


// 레시피 보여주기
router.get("/view", recipeController.showRecipe);
// showRecipe에서 ejs 파일내부에 작성자가 맞는지 확인하고, 맞으면 수정/삭제 버튼 보여줄 것.

// 4) 검색
// query로 검색어랑 검색 조건 입력 받기
router.get("/search", recipeController.searchRecipe)

// 5) recipe writing
router.get("/write", isLoggedIn, recipeController.showWritePage);
router.post("/write", isLoggedIn, recipeController.createRecipe);

// 6) recipe updating
router.get("/update", isLoggedIn, /*작성자 체크*/ recipeController.showUpdatePage);
router.post("/update", isLoggedIn, /*작성차 체크*/recipeController.updateRecipe);

// 7) delete
router.get("/delete", isLoggedIn, /*작성자 체ㅋ*/recipeController.deleteRecipe);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);


module.exports = router;