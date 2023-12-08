const express = require('express');
const router = express.Router();
const { db, sequelize } = require('../models/index');

const recipeController = require('../controllers/recipeController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn, getPaginationInfo, setDBModel, storeUrl } = require('./middlewares');

// ⚠️1) 메인 레시피, 5위까지 + 추천
// router.get("/", recipeController.showMainPage);
router.get("/", storeUrl, recipeController.showMainPage)

// ⚠️2) 전체 레시피 목록 - ✅최신순, ✅조회수순, 좋아요순, + 페이지네이션
// 🚩 pagination 함수 따로 만들고 기존 함수랑 바꾸기
router.get("/list", storeUrl, setDBModel(db.recipe), getPaginationInfo, recipeController.getTagNameList, recipeController.showRecipeListPage);
    // 좋아요 순을 여기에 넣어야할까/
// ⚠️3) 특정 상황별 레시피 목록 ; 상황(category)별 전체, 시간, 인기순, + 페이지네이션


// 레시피 보여주기
// router.get("/view", recipeController.showRecipe);
// showRecipe에서 ejs 파일내부에 작성자가 맞는지 확인하고, 맞으면 수정/삭제 버튼 보여줄 것.
router.get("/view", storeUrl, recipeController.showRecipe);

// 4) 검색
// query로 검색어랑 검색 조건 입력 받기
// router.get("/search", recipeController.searchRecipe);
// ?search=xxx로 하면 미들웨어 setDBModel에서 설정함.
router.get("/search", storeUrl, setDBModel, getPaginationInfo, (req, res)=>{
    if(!res.locals.paginationInfo || !res.locals.dataList){
        console.log("[ERROR] There's no pagination information or data list. - /search");
        res.redirect("/list");
    }
    
    try{
        const obj = {};
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;

        // res.render('recipeSearchResult', obj);
        res.json(obj);
    } catch (err) {
        console.log("[ERROR] While rendering recipe search List", err);
        res.redirect("/list");
    }
})

// 5) recipe writing
router.get("/write", isLoggedIn, recipeController.getTagNameList, recipeController.showWritePage);
router.post("/write", isLoggedIn, recipeController.createRecipe);

// 6) recipe updating
router.get("/update", isLoggedIn, /*작성자 체크*/ recipeController.showUpdatePage);
router.post("/update", isLoggedIn, /*작성차 체크*/recipeController.updateRecipe);

// ✅7) delete
router.get("/delete", isLoggedIn, /*작성자 체크*/recipeController.deleteRecipe);
// query ?(recipe)no = & 

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);


module.exports = router;