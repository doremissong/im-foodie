// recipe controller
const { db, sequelize } = require("../models/index");

module.exports={
    showMainPage: (req, res)=>{
// 1) 메인 레시피, 5위까지 + 추천
        // res.send('hi showMAinPage');
        res.render("recipeMain");
    },

    showRecipeListPage: async(req, res)=>{
        // 시간순, 조회수순, 좋아요순, 💚해시태💚순으로 검색할 수 있게 
        // 미들웨어에 setDBModel에 설정해두기

        try {
            const obj = {};
            obj.pagination = res.locals.paginationInfo;
            obj.dataList = res.locals.dataList;
            // console.log(`[TEST] SHOWMAINPAGE`, obj);
            // obj.operator = req.operator;
            res.render('recipeList', obj);
        } catch (err) {
            console.log(`[ERROR] showMainPage check getPaginationInfo - recipe`, err);
            res.redirect('/');
        }
    },

    showWritePage: (req, res)=>{
        try {
            const obj = {};
            obj.recipeId = req.query.recipe_no;
            // obj.operator_id = req.operator.id;
            res.render('recipeWrite', obj);
        } catch (err) {
            res.redirect('/recipe');
            console.log(`[Error]: There's no recipe_no in url - showWritePage - recipe`, err);
        }
    },

    showUpdatePage: async(req, res)=>{
        //title, menu, content, cooktime, level, image_url (6) 수정 가능
        if (req.query.recipe_no) {
            const obj = {};
            var temp = {};
            const recipeId = req.query.recipe_no;
            try {
                await sequelize.transaction(async t => {
                    temp = await db.recipe.findOne({
                        attributes: ['recipe_id', 'title', 'menu', 'content', 'cooktime', 'level', 'imageURL'],
                        where: { recipe_id: recipeId }
                    })
                })
                obj.dataList = temp.dataValues;
                console.log(obj.dataList, '값확인');
            } catch (err) {
                console.log(`[Error] cannot get recipe data from DB - showUpdatePage.- recipe`, err);
                res.redirect('/recipe');
            }

            // 관리자 아이디 obj에 너허어
            // obj.operator_id = req.operator.id;
            res.render('recipeUpdate', obj);
        } else {
            res.redirect('/recipe');
            console.log(`[Error]: There's no recipe_no in url - showUpdatePage`);
        }
    },

    showRecipe: async (req, res)=>{
        if (req.query.recipe_no) {
            const recipeId = req.query.recipe_no;
            const obj = {};
            if(req.user){
                obj.user = req.user;
            }
            // 글 정보 가져오기
            try {
                await sequelize.transaction(async t => {
                    await db.recipe.update(
                        { viewCount: sequelize.literal('viewCount+1') },
                        {
                            where: { recipe_id: recipeId },
                            transaction: t
                        }
                    )
                })
            } catch (err) {
                console.log('[ERROR] while updating viewCount -showRecipe', err);
                res.redirect('/recipe');
            }
            try {
                obj.dataList = await db.recipe.findOne({
                    // attributes : [], 관리자 id 빼고, 제목, 내용, 시간, 
                    where: { recipe_id: recipeId }
                });
                console.log(`showRecipe컨트롤러 ojb 확인:`, obj.dataList);
                res.render('recipeView', obj);
            } catch (err) {
                console.log(`[ERROR] select a recipe - showRecipe`, err);
                res.redirect('/recipe',);
            }
        } else {
            console.log(`[ERROR] recipe number wasn't sent. - showRecipe`);
            // res.redirect('/recipe');
        }
    },

    // # 해시태그로 검색은??❓
    searchRecipe: (req, res)=>{
        // 이것도 "검색어"가 있다는 거 빼곤 showRecipeListPage랑 같음.
        // 아직 몰라
    },
    
    createRecipe: async (req, res)=>{
        // post로 받음. //title, menu, content, cooktime, level, image_url  입력스, 이외는 자동
        if (!req.body) {
            console.log(`[ERROR] Req.params are not sent. - createRecipe`);
            res.redirect('/recipe');
        }
        // 값 전달 잘 되면
        const obj = {
            writer_id: req.user.mem_id,
            title: req.body.title,
            menu: req.body.menu,
            content: req.body.content,
            cooktime: req.body.cooktime,
            level: req.body.level,
            imageURL: req.body.imageURL,
            viewCount: 0,
        }
        console.log(`createRecipe- obj test: ${obj.content}`);
        try {
            var data = {};
            await sequelize.transaction(async t => {
                data = await db.recipe.create(obj, { transaction: t });
            })
            console.log(`createRecipe- data test: ${data}`);
            res.redirect(`/recipe/view?recipe_no=${data.recipe_id}`);
        } catch (err) {
            console.log(`[ERROR] while creating recipe - createRecipe - recipe`, err);
            res.redirect('/recipe');
        }

    },

    updateRecipe: async (req, res)=>{
        // post로 받음. //title, menu, content, cooktime, level, image_url (6) 수정
        console.log('업데이트 시도 시작?');
        if(req.query.recipe_no && req.params){
            // 값 전달 잘 되면
            const recipeId = req.query.recipe_no;
            console.log('쿼리 recipe 번호 check', recipeId);
            const obj = {
                title: req.body.title,
                menu: req.body.menu,
                content: req.body.content,
                cooktime: req.body.cooktime,
                level: req.body.level,
                imageURL: req.body.imageURL
            }
            try {
                var data = {};
                await sequelize.transaction(async t => {
                    data = await db.recipe.update(obj, {
                        where: { recipe_id: recipeId },
                        transaction: t
                    });
                })
                console.log(`updateRecipe- data test:`, data);
                res.redirect(`/recipe/view?recipe_no=${recipeId}`);
            } catch (err) {
                console.log(`[ERROR] while creating recipe - updateRecipe`, err);
                res.redirect('/recipe');
            }
        } else{
            console.log(`[ERROR] Req.params are not sent. - updateRecipe`);
            res.redirect('/recipe');
        }
    },

    deleteRecipe: async(req, res)=>{
        // query에 글 id있어
        const recipeId = req.query.recipe_no;
        try{
            await sequelize.transaction(async t=>{
                await db.recipe.destroy({
                    where: {recipe_id: recipeId}
                });
            });
            res.redirect("/recipe");
        } catch (err){
            console.log(`[ERROR] Deleting recipe: - recipe`, err);
        }
    },
    
    // 태그 검색 함수
    // https://jeonst.tistory.com/35
}