// recipe controller
const { db, sequelize } = require("../models/index");
const { Op } = require('sequelize');
const recipe = require("../models/recipe");
const { setPagingVar } = require("../routes/middlewares");
const recipe_ingredient = require("../models/recipe_ingredient");

module.exports={
    // 사용자 좋아요 테이블에서 recipe_tag나 작성한 레시피 recipe_tag 가져와서 
    // recipe_tag 의 notice_id 찾아서 ==> recipe 테이블에서 검색한 거 
    // 일부 보여주기. 
    // 함수로 만들어야하나? limit: 주고
    testCtrl: (req,res)=>{
      console.log('hi = testCtrl');  
    //   return 'hi';
    },
    showMainPage: async (req, res)=>{
        try{
            // console.log(module.exports);
            module.exports.testCtrl(req,res);
        } catch(err){
            console.log(err);
        }
        const obj ={};
        if(req.user){
            obj.user = req.user;
        }

        obj.user = req.user;
    // 1) 메인 레시피, 5위까지 + 추천
    // try{
    //     const data = await db.post.findAll({
    //         // attributes: ['recipe_id'],
    //         // where:
    //         order: [["viewCount", "DESC"]], 
    //         limit: 5,
    //     })
    //     res.json(data);
    // } catch(err){
    //     console.log('[ERROR]: while showing top 5 recipes', err);
    //     res.json(err);
    // }

        res.render("recipe/recipeMain", obj);
    },

    showRecipeListPage: async(req, res)=>{
        // 시간순, 조회수순, 좋아요순, 💚해시태💚순으로 검색할 수 있게 
        // ⚠️recipe             --> 제목, 작성자, 메뉴, 날짜, 난이도, 시간, 이미지, 조회수 가져오기
        // ⚠️tag                --> 이 글의 상황 태그 가져오기
        // getPaginationInfo 정보 존재확인

        const obj = {};

        // 페이지네이션 확인
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log("[ERROR] There's no pagination information or data list.");
            res.redirect("/recipe/list");
        }

        // 태그 정보 확인
        if(!res.locals.tagNameList || ! res.locals.tagIdList){
            console.log("[ERROR] There's no tag name and id list.");
            res.redirect("/recipe");
        }

        if(req.user){
            obj.user = req.user;
        }


        try {

            //페이지네이션
            obj.pagination = res.locals.paginationInfo;
            obj.dataList = res.locals.dataList;         //index==>0~
            // obj.dataList.map(data=>{data.map(recipe => {
            //     recipe.content.replaceAll(/\r\n/g, '<br>');
            //     })});
            for(let i =0; i<obj.dataList.length; i++){
                // console.log(obj.dataList[i].dataValues.intro,i,'번째');
                obj.dataList[i].dataValues.intro = obj.dataList[i].dataValues.intro.replaceAll(/\r\n/g, '<br>');
            }
            // const content  = obj.dataList.map(recipe=> recipe);//.replaceAll(/\r\n/g, '<br>'));
            // console.log(content, '여기야,');
            // obj.dataList.content = obj.dataList.content.replaceAll(/\r\n/g, '<br>');
            // 태그 종류 표시
            obj.tagNameList = res.locals.tagNameList;
            obj.tagIdList = res.locals.tagIdList;

            // console.log(`[TEST] SHOWMAINPAGE`, obj);
            // obj.operator = req.operator;
            // res.json(obj.dataList);
            // console.log(obj.dataList[0]);

            // dataList로 recipeId 배열 만들기
            const recipeIds = obj.dataList.map(recipe=> recipe.dataValues.recipe_id);   // raw: true하고 dataValues 빼기
            console.log('recipeIds: ', recipeIds);

            // 각 레시피의 Tag 정리
            // const tagList = [];
            obj.tagList = [];

            //forEach는 비동기함수 기다리지 않고, 반복문 실행
            // 비동기함수 완료되지 않은 상태에서 res.send호출할 수 있음
            // --> for of
            for(const [index, id] of recipeIds.entries()){            //index 0~~
                ;
                obj.tagList[index]={};
                // console.log(obj.tagList[index], '2', typeof obj.tagList[index]);
                // obj.tagList[index].recipe_id= id;


                const result = await db.tag.findAll({
                    attributes: [['tag_id', 'tag_id'],['tag_name','tag_name']],
                    include: [
                        {
                            model: db.recipe_tag,
                            attributes: [['recipe_id', 'recipe_id']],
                            where: {
                                recipe_id: id,
                            },
                            as: "recipe_tags"
                        }],
                    raw: true
                })
                obj.tagList[index].tags = result.map(tag=> tag.tag_name); 
                // console.log(obj.tagList[index], '3', typeof obj.tagList[index]);

                // 😊
                // obj.tagList[0].tags.forEach((tag, index)=>{
                //     console.log(index,"번재", tag);
                // });
                // 😊
                // obj.tagList.forEach((tags, index)=>{
                //     console.log('obj.tagList foreach', index, '번째:', tags.tags);
                //     tags.tags.forEach((tag, index2)=>{
                //         console.log('이중 forEach tag: ', tag);
                //     })
                // })

                // obj.tagList foreach 0 번째 tags: { tags: [ '홈파티', '한식' ] }
                // obj.tagList foreach 1 번째 tags: { tags: [ '초보자', '간단', '도시락' ] }   
                

                console.log('tagList 값 확인', obj.tagList[index]);
                // console.log('query result check;', tagList[index].recipe_id, tagList[index].tags);
                // console.log('tagList 값 확인', tagList[index]);
                    // })
            }
            
            //🚩 페이지네이션 된 데이터로 tag 검색하기. 아 복잡해
            // recipe_tag 검색하고 또  tag 검색하고

        } catch (err) {
            console.log(`[ERROR] showRecipeListPage check getPaginationInfo - recipe`, err);
            // res.redirect('/');
        }
        obj.curTag = req.params.tag;
        // console.log(obj.curTag);
        res.render('recipe/recipeList', obj);
        // console.log('tagList 값 확인////', obj);
    },

    showWritePage: (req, res)=>{
        
        // ⚠️recipe             --> 제목, 작성자, 메뉴, 날짜, 난이도, 시간, 이미지, 조회수 가져오기
        // ⚠️recipe_ingredient  --> 재료 가져오기
        // ⚠️recipe_step        --> 요리 순서 가져오기
        // ⚠️tag                --> 이 글의 상황 태그 가져오기
        // ⚠️recipe_like --> 좋아요 수 & fetch로 좋아요 클릭
        // ⚠️recipe_comment     --> 댓글 수, 댓글 가져오기
        
        const obj = {};

        // user 로그인 확인
        if(!req.user){
            console.log('[ERROR] This user is not logged in.');
            res.redirect("/auth/login");
        }
        obj.user = req.user;

        if(!res.locals.tagNameList || !res.locals.tagIdList){
            console.log('[ERROR] There is no tag name or id list');
            res.redirect("/recipe");
        }
        obj.tagNameList = res.locals.tagNameList;
        obj.tagIdList = res.locals.tagIdList;

        try {
            obj.recipeId = req.query.recipe_no;
            // obj.operator_id = req.operator.id;
            res.render('recipe/recipeWrite', obj);
        } catch (err) {
            res.redirect('/recipe');
            console.log(`[Error]: There's no recipe_no in url - showWritePage - recipe`, err);
        }
    },

    // 작성한 태그도 가져오기
    showUpdatePage: async(req, res)=>{
        // recipe - title, menu,  cooktime, level, image_url (6) 수정 가능
        // ⚠️recipe_ingredient - 재료들 몽땅 수정
        // ⚠️recipe_step
        // ⚠️tag                --> 이 글의 상황 태그 가져오기
        // ⚠️recipe_like --> 좋아요 수 & fetch로 좋아요 클릭
        // ⚠️recipe_comment     --> 댓글 수, 댓글 가져오기

        if (!req.query.no) {
            console.log(`[Error]: There's no recipe_no in url - showUpdatePage`);
            res.redirect('/recipe');
        }
        console.log('query값 확인: ', req.query.no);
        const _recipeId = req.query.no;

        if(!res.locals.tagNameList || !res.locals.tagIdList){
            console.log('[ERROR] There is no tag name or id list');
            res.redirect("/recipe");
        }
        const obj = {};
        obj.tagNameList = res.locals.tagNameList;
        obj.tagIdList = res.locals.tagIdList;
        
        var temp = {};
        try {
            temp = await db.recipe.findOne({
                attributes: ['recipe_id', 'title', 'menu', 'intro', 'cookTime', 'cookLevel', 'imageURL', 'viewCount'],
                where: { recipe_id: _recipeId },
                raw: true,
            })
            obj.data = temp;
            console.log(obj.data, '값확인');

            // ⚠️태그는 write처럼 전체 태그 가져오고, 검색한 걸를 selected tag로 해서
            // 같으면 선택 처리 해야할 거 같음..⚠️ 그렇게 하면 굳이 이름을 가져올 필요까지는 없음.
            // recipe_tag 정보 가져오기
            temp = await db.recipe_tag.findAll({
                attributes: ['tag_id', 'tag_id'],
                where: { recipe_id: _recipeId },
                raw: true,
            });
            // ⚠️dataValues로 하면 안되고 매핑해야할 거 같음
            obj.selectedTagIdList = temp.map(data=>data.tag_id);
            console.log('tag value: ', obj.selectedTagIdList);

            // recipe_step 가져오기
            temp = await db.recipe_step.findAll({
                attributes:[['step_no', 'step_no'], ['content', 'content'], ['imageURL','imageURL']],
                where: {recipe_id: _recipeId },
                raw: true,
            });
            // ⚠️dataValues로 하면 안되고 매핑해야할 거 같음
            obj.stepList = temp;

            // recipe_ingredient 가져오기
            temp = await db.recipe_ingredient.findAll({
                attributes:[['name', 'name'],
                // ['amount', 'amount'],
                //  ['imageURL','imageURL']
                ],
                where: {recipe_id: _recipeId },
                raw: true,
            });
            // ⚠️dataValues로 하면 안되고 매핑해야할 거 같음
            obj.ingredientList = temp;
            
        } catch (err) {
            console.log(`[Error] cannot get recipe data from DB - showUpdatePage.- recipe`, err);
            // res.redirect('/recipe');
            res.send(err);
        }

        console.log('따로국밥: ', obj);
        // 관리자 아이디 obj에 너허어
        // obj.operator_id = req.operator.id;
        res.render('recipe/recipeUpdate', obj);
    },

    showRecipe: async (req, res)=>{
        // 불러올 것. recipe_id로
        // ⚠️recipe             --> 제목, 작성자, 메뉴, 날짜, 난이도, 시간, 이미지, 조회수 가져오기
        // ⚠️recipe_ingredient  --> 재료 가져오기
        // ⚠️recipe_step        --> 요리 순서 가져오기
        // ⚠️tag                --> 이 글의 상황 태그 가져오기
        // ⚠️recipe_like --> 좋아요 수 & fetch로 좋아요 클릭
        // ⚠️recipe_comment     --> 댓글 수, 댓글 가져오기
        if (!req.query.no) {
            console.log(`[ERROR] recipe number wasn't sent. - showRecipe`);
            // res.redirect('/recipe');
        }
        const recipeId = req.query.no;
        const obj = {};
        obj.likeInfo = {};
        if (req.user) {
            obj.user = req.user;
            const result = await db.recipe_like.findOne({ attributes: ['isLiked'], where: { recipe_id: recipeId, mem_id: req.user.mem_id } });
            obj.likeInfo.isLiked = result ? result.isLiked : false;
        }
        // 1) 좋아요
        // 개수도 필요한데, 유저 정보도 필요해. 이사람이 추천, 스크랩 했는지 안했는지
        const likeCount = await db.recipe_like.count({ where: {  recipe_id: recipeId, isLiked: 1 } });
        obj.likeInfo.likeCount = likeCount;
        
        // 2) 댓글
        if (res.locals.commentInfo) {
            // obj.commentInfo = {};
            obj.commentInfo = res.locals.commentInfo;
            // console.log('obj 값 확인 : ', obj.commentInfo);
        }

        
        // 조회수 업데이트!
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
        // 글 정보 가져오기
        try {
            obj.data = await db.recipe.findOne({
                where: { recipe_id: recipeId },
                raw: true,
            });
            obj.data.intro = obj.data.intro.replaceAll(/\r\n/g, '<br>');

            // 재료
            // ❓dataValues 해야하나?
            obj.ingredientList = await db.recipe_ingredient.findAll({
                where: { recipe_id: recipeId },
                raw: true,
            });
            // 요리 순서 
            obj.stepList = await db.recipe_step.findAll({
                where: { recipe_id: recipeId },
                raw: true,
            });
            obj.stepList.forEach((step, index)=>{
                // console.log(step.content);
                step.content = step.content.replaceAll(/\r\n/g, '<br>');
            })

            // 태그
            const temp = await db.tag.findAll({
                attributes: ['tag_name', 'tag_name'],
                include: [{
                    model: db.recipe_tag,
                    attributes: ["tag_id", "tag_id"],
                    where: { recipe_id: recipeId },
                    as: "recipe_tags"
                }],
                raw: true,
            })
            // ❓맞나??
            obj.tagList = temp.map(data=> data.tag_name);


            console.log(`showRecipe컨트롤러 ojb 확인:`, obj);
        } catch (err) {
            console.log(`[ERROR] select a recipe - showRecipe`, err);
            res.redirect('/recipe',);
        }
            res.render('recipe/recipeView', obj);
    },

    // # 해시태그로 검색은??❓
    searchRecipe: (req, res)=>{
        // ==> showSearchedRecipe 
        // 불러올 것. recipe_id로
        // recipe
        // recipe_ingredient 
        // recipe_step

        // 이것도 "검색어"가 있다는 거 빼곤 showRecipeListPage랑 같음.
        // 아직 몰라
        module.exports.testCtrl(req,res);
        // const test = ///
        // if(!res.locals.paginationInfo || !res.locals.dataList){
        //     console.log("[ERROR] There's no pagination information or data list. - /search");
        //     res.redirect("/recipe");
        // }
        
        // try{
        //     const obj = {};
        //     obj.pagination = res.locals.paginationInfo;
        //     obj.dataList = res.locals.dataList;
    
        //     // res.render('recipeSearchResult', obj);
        //     res.json(obj);
        // } catch (err) {
        //     console.log("[ERROR] While rendering recipe search List", err);
        //     res.redirect("/list");
        // }
        res.json('hiiii');
    },
    createRecipe: async (req, res)=>{
        // method='POST'
        
        // recipe - recipe_id 로 테이블(tag, step, ingredient)에 데이터 추가
        if (!req.body) {
            console.log(`[ERROR] Req.params are not sent. - createRecipe`);
            res.redirect('/recipe');
        }

        console.log(req.body);
        // 값 전달 잘 되면
        const recipeObj = {
            writer_id: req.user.mem_id,
            title: req.body.title,
            menu: req.body.menu,
            intro: req.body.intro,
            cookTime: req.body.cooktime,
            cookLevel: req.body.cookLevel,
            // imageURL: req.body.imageURL,
            viewCount: 0,
        }
        // recipe 생성
        try {
            var data = {};
            await sequelize.transaction(async t => {
                data = await db.recipe.create(recipeObj, { transaction: t });
            })
            res.locals.recipeId = data.recipe_id;
            // console.log(`createRecipe- data test: ${data}`);
        } catch (err) {
            console.log(`[ERROR] while creating recipe - createRecipe - recipe`, err);
            res.redirect('/recipe');
        }
        // 🚩 위에 recipe 생성이 먼저 되고, 아래 함수들 실행될까?
        // res.locals.recipeId =0;

        // 🚩 이 아래 부분을 따로 함수로 빼고 update, create할 때 적용할까?
        // tag 저장
        const recipe_tag_data = module.exports.setRecipeTagData(res.locals.recipeId, req.body.tag);
        // ingredients 저장
        const ingredient_data = module.exports.setRecipeIngredientData(res.locals.recipeId, req.body.ingredient, req.body.quantity);
        // step 요리 단계 저장
        const step_data=module.exports.setRecipeStepData(res.locals.recipeId, req.body.step);
        // db 3개 저장
        try{
            await sequelize.transaction(async t=>{
                // 태그 저장장
                await db.recipe_tag.bulkCreate(recipe_tag_data, {transaction:t})
                    .then(createdRows => {
                        console.log(createdRows);
                    })
                    .catch(err => {
                        console.log('[ERROR] during bulkCreate on recipe_tag', err);
                    })

                // 재료 저장
                await db.recipe_ingredient.bulkCreate(ingredient_data, {transaction:t})
                    .then(createdRows => {
                        console.log(createdRows); // 생성된 행의 정보
                    })
                    .catch(err => {
                        console.error('[ERROR] during bulkCreate on recipe_ingredient', err);
                    });
                // 요리단계 저장
                await db.recipe_step.bulkCreate(step_data, {transaction:t})
                    .then(createdRows => {
                        console.log(createdRows);
                    })
                    .catch(err => {
                        console.log('[ERROR] during bulkCreate on recipe_step', err);
                    })
            })
        } catch(err){
            console.log('[ERROR] Transaction failed: ',err);
        }
        // res.send('okkk');
        res.redirect(`/recipe/view?no=${data.recipe_id}`);
    },

    updateRecipe: async (req, res)=>{
        
        // 불러오고 수정하기. recipe_id로
        // recipe -  post로 받음. //title, menu, content, cooktime, level, image_url (6) 수정
        // ⚠️recipe_ingredient 
        // ⚠️recipe_step

        console.log('업데이트 시도 시작?');

        // 전달받은 값 확인
        if(!req.query.no){
            console.log(`[ERROR] recipe number is not sent. - updateRecipe`);
            res.redirect('/recipe');
        }
        if(!req.params){
            console.log(`[ERROR] Req.params are not sent. - updateRecipe`);
            res.redirect('/recipe');
        }

        const recipeId = req.query.no;
        // console.log('타입:', req.body.tag);
        // console.log('[updateRecipe-ctrl] recipe_id: ', recipeId);
        // // 단계, 재료 0개는 통과x
        try{
            if (typeof req.body.tag == 'undefined' || typeof req.body.ingredient == 'undefined' || typeof req.body.step == 'undefined') {
                console.log('[ERROR] 태그, 재료나 단계는 필수 입력 사항입니다.');
                // res.json('안돼 돌아가');
                // res.send(`<script>alert('태그, 재료, 단계는 필수 입력 사항입니다.');`); //location.href='/recipe/update?no=${recipeId}';</script>`);
                // throw new Error();
            }
        } catch(err){
            res.redirect(`/recipe/update?no=${recipeId}`);
        }

        const recipeObj = {
            // writer_id: req.user.mem_id,
            title: req.body.title,
            menu: req.body.menu,
            intro: req.body.intro,
            cookTime: req.body.cooktime,
            cookLevel: req.body.cookLevel,
            // imageURL: req.body.imageURL,
        }
        // recipe 수정
        try {
            // var data = {};
            await sequelize.transaction(async t => {
                // data = 
                await db.recipe.update(recipeObj, {
                    where: { recipe_id: recipeId },
                    transaction: t
                });
            })
            // console.log(`updateRecipe- data test:`, data); // [바꾼값만 나옴. 아마? 전에 [1] 이렇게 나오던데? ]
        } catch (err) {
            console.log(`[ERROR] while updating recipe - updateRecipe`, err);
            res.redirect(`/recipe/view?no=${recipeId}`);
        }

        // 태그가 문제야 지금!!,,ㅠ1208
        // 1) recipe_tag, ingredient, step 삭제
        try{
            await sequelize.transaction(async t=>{
                // tag
                await db.recipe_tag.destroy({
                    where:{ recipe_id: recipeId },
                    transaction: t
                });
                // ingredient
                await db.recipe_ingredient.destroy({
                    where: { recipe_id: recipeId },
                    transaction: t
                });
                // step
                await db.recipe_step.destroy({
                    where: { recipe_id: recipeId },
                    transaction: t
                })
            })
        } catch(err){
            console.log('[ERROR] while deleting tables related recipe. ', err);
            res.redirect(`/recipe/view?no=${recipeId}`)
        }

        // error부분  빼고 createRecipe랑 똑같음.
        // 2) recipe_tag, ingredient, step 다시 생성
        // tag 저장
        const recipe_tag_data = module.exports.setRecipeTagData(recipeId, req.body.tag);
        // ingredients 저장
        const ingredient_data = module.exports.setRecipeIngredientData(recipeId, req.body.ingredient, req.body.quantity);
        // step 요리 단계 저장
        const step_data=module.exports.setRecipeStepData(recipeId, req.body.step);
        // db 3개 저장
        try{
            await sequelize.transaction(async t=>{
                // 태그 저장
                await db.recipe_tag.bulkCreate(recipe_tag_data, {transaction:t})
                    .then(createdRows => {
                        console.log(createdRows);
                    })
                    .catch(err => {
                        console.log('[ERROR] during bulkCreate on recipe_ta', err);
                    })

                // 재료 저장
                await db.recipe_ingredient.bulkCreate(ingredient_data, {transaction:t})
                    .then(createdRows => {
                        console.log(createdRows); // 생성된 행의 정보
                    })
                    .catch(err => {
                        console.error('[ERROR] during bulkCreate on recipe_ingredient', err);
                    });
                // 요리단계 저장
                await db.recipe_step.bulkCreate(step_data, {transaction:t})
                    .then(createdRows => {
                        console.log(createdRows);
                    })
                    .catch(err => {
                        console.log('[ERROR] during bulkCreate on recipe_step', err);
                    })
            })
            
        } catch(err){
            console.log('[ERROR] Transaction failed while creating tables related recipe : ',err);
            res.redirect(`/recipe/view?no=${recipeId}`);
        }

        // 해당 레시피로 리디렉션
        // res.redirect(`/recipe/view?no=${recipeId}`);
        res.send('hwy');
    },

    deleteRecipe: async (req, res) => {
        // cascade ⚠️ step, ingredients, 
        if (!req.user) {
            // 로그인 상태 아니면
            // res.redirect(res.locals.history);
            console.log('로그인 상태 확인');
            res.redirect('/recipe');
            // res.redirect(res.locals.history);
        }
        const memId = req.user.mem_id;
        // query no있는지 체크
        if (!res.query.no) {
            console.log("There's no number of recipe to delete");
            res.redirect('/recipe');
            // res.redirect(res.locals.history);
        }
        const recipeNo = req.query.no;

        // 글 삭제 --> recipe_tag, iingredient, step 같이 삭제.
        // 댓글, 좋아요도 같이 삭제해야하나.
        try {
            await sequelize.transaction(async t => {
                //
                await db.recipe.destroy({
                    where: { recipe_no: recipeNo },
                    transaction: t,
                })
            })
        } catch (err) {
            console.log('[ERROR] While deleting recipe.', err);
            res.redirect('/recipe');
            // res.redirect(res.locals.history);
        }
    },
    
    getTagNameNIdList: async(req, res, next)=>{
        try {
            const result = await db.tag.findAll({
                attributes: [['tag_id','tag_id'], ['tag_name','tag_name']],
                raw: true,
            })

            res.locals.tagNameList = result.map(data => data.tag_name);
            res.locals.tagIdList = result.map(data=> data.tag_id);
            // [
            //     1, 2, 3, 4,  5,
            //     6, 7, 8, 9, 10,
            //    11
            //  ]
            next();
        } catch (err) {
            console.log('[ERROR] While get tagname list',err);
            // res.redirect('/recipe');
            next(err);
        }
    },
    setRecipeTagData:(recipeId, tagList)=>{
        // console.log(req.query.no);// (req,res)일 때 전달 안됨.
        const _recipeId = recipeId;
        const tags = tagList;
        const recipe_tag_data = [];
        for(let i =0; i<tags.length; i++){
            const tagObj = {
                recipe_id: _recipeId,
                tag_id: tags[i]
            }
            recipe_tag_data.push(tagObj);
        };
        return recipe_tag_data;
    },
    setRecipeIngredientData:(recipeId, ingredient, amount)=>{
        const _recipeId = recipeId;
        const ingredients = ingredient;
        const amounts = amount;
        const ingredient_data=[];
        for(let i=0; i<ingredients.length; i++){
            if(ingredients[i]=='')
                break;
            const ingredientObj = {
                recipe_id: _recipeId,
                name: ingredients[i],
                amount: amounts[i]
            }
            ingredient_data.push(ingredientObj);
        };
        return ingredient_data;
    },
    setRecipeStepData:(recipeId, step)=>{
        const _recipeId = recipeId;
        const steps = step;
        const step_data=[];
        for(let i=0; i<steps.length; i++){
            if(steps[i]=='')
                break;
            const stepObj = {
                recipe_id: _recipeId,
                step_no: i+1,
                content: steps[i],
                // imageURL: 
            }
            step_data.push(stepObj);
        };
        return step_data;
    },
    setLike: async(req, res)=>{
        console.log('[setLike] 도착', req.body);
        // post 방식

        if(!req.user){
            console.log('[ERROR] Not logged in user is trying to push like.');
            res.json({success: false});
        }

        if(typeof req.body.recipeId == 'undefined' || typeof req.body.isLiked == 'undefined'){
            console.log('[ERROR] recipe id and isLiked value are not sent.');
            res.json({success: false});
        }

        const recipeId = req.body.recipeId;
        const memId = req.user.mem_id;
        const likeClicked = req.body.isLiked || 0;
        var likeResult = false;
        // console.log('[setLike-recipe] recipe_id:', recipeId, 'likeClicked: ', likeClicked);

        // recipe_like 수정시작
        try{
            await sequelize.transaction(async t => {
                const existingRecord = await db.recipe_like.findOne({
                    where: {
                        recipe_id: recipeId,
                        mem_id: memId,
                    }
                });
                if (existingRecord) {
                    console.log('recipe_like UPDATE');
                    // 그 row 가지고?
                    const result = await db.recipe_like.update(
                        { isLiked: likeClicked },
                        { where: { recipe_id: recipeId, mem_id: memId }, transaction: t, raw: true }
                    );
                    likeResult = result.isLiked;
                    // console.log('update result:', result);
                } else {
                    //존재하지 않는 경우
                    console.log('recipe_like CREATE');
                    const result = await db.recipe_like.create({
                        recipe_id: recipeId,
                        mem_id: memId,
                        isLiked: likeClicked
                    },
                        { raw: true });
                    // console.log('create result:', result);
                    likeResult = result.isLiked;
                }
            });

            // ⚠️(따로빼기) 좋아요 수 업데이트 확인
            const likeCount = await db.recipe_like.count({
                where: {
                    recipe_id: recipeId,
                    isLiked: 1,
                }
            });
            // 좋아요 결과
            var result = await db.recipe_like.findOne({
                attributes: ['isLiked'],
                where: {
                    recipe_id: recipeId,
                    mem_id: memId,
                }
            })
            const isLiked = result? result.isLiked: false;
            
            console.log("좋아요 설정 완료", isLiked);
            // const isLiked = result? result.isLiked: false;
            console.log('[setLike-recipe]11 recipe_id:', recipeId, 'likeClicked: ', likeClicked);
            res.json({ success: true, message: '좋아요를 눌렀습니다!', likeCount: likeCount, isLiked: isLiked });

        } catch(err){
            console.log('[ERROR] setLike - recipe ctrl: ', err);
            res.json({success: false});
        }
    },

    // POST /newComment
    createComment : async(req, res, next)=>{
        if(!req.body){
            res.json({success: false, message:'댓글 내용이 없습니다. 다시 시도해주세요.'});
        }
        console.log('fetch result:', req.body)

        try{
            await sequelize.transaction(async t=>{
                await db.recipe_comment.create({
                    recipe_id: req.body.recipeId,
                    mem_id: req.user.mem_id,
                    content: req.body.content
                }, {transaction: t})
            })
            next();
        } catch(err){
            console.log('[Error] createComment-recipe ctrl : while creating comment', err);
            next(err);
        }
    },

    // /getComment
    getCommentInfo: async(req, res, next)=>{
        console.log('getCommentInfo - recipe ctrl 도착');
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log('[Error]: While setting commentInfo');
            // 에러 생기려나???
            next(err);
        }
        try{
            res.locals.commentInfo = {}; 
            res.locals.commentInfo.pagination = res.locals.paginationInfo;
            res.locals.commentInfo.dataList = res.locals.dataList;
            res.locals.commentInfo.count = await db.recipe_comment.count({where:{recipe_id: req.query.no}});
            // console.log('getCommentInfo - dataList:', res.locals.commentInfo.count);    
            
            next();
        } catch(err){
            // res.redirect('/');
            next(err);
        }
    },
    showComment: async(req, res)=>{
        const obj = {};
        try {
            obj.success = true;
            obj.page = res.locals.commentInfo.pagination.totalPage;
            res.json(obj);
        } catch(err){
            res.json({success: false});
            console.log('[ERROR] showComment-recipe ctrl', err);
        }

    },
    sendComment: async(req, res)=>{
        try{
            res.json({success:true, commentInfo: res.locals.commentInfo});
        } catch(err){
            res.json({success: false});
        }
    },





    // 추후에 따로 뺄 함수들
    // 1) TAG, STEP, INGREDIENT CREATE하는 함수
    // 2) 레시피 리스트 가져오는 함수, 페이지네이션 새로 해야할거 같은데
    // 페이지네이션 함수를 또 가져오긴 그렇고, 
    // 그전 미들웨어에서 tag, recipe_tag 조인하고 tag_name으로 recipe_id를 찾아서 그 레시피만 가져와.
        // ?searchType=TAG, INGREDIENT, CONTENT, TITLE, WRITER, 
        // 종합

        // searchTagTable의 리턴값
        // searchStepTable의 리턴값
        // searchIngredientTable의 리턴값
        // searchRecipeTable의 리턴값

        // 네개의 recipe_id 값을 합치기
        // 아니면 그냥 SEQUELIZE에 맡겨버리기 WEHRE에 다 때려넣어

        // RECIPE에 RECIPE_ID 검색하기
        // 정보 OBJ에 담아 전달하기
        // ㄱㄷ

    checkTagValue: async (req, res, next)=>{
        console.log('/list/:tag 값 확인: ', req.params.tag);

        if(req.params.tag){
            // 태그 해당하는 레시피 id 가져옴.
            const _recipeIds = await module.exports.searchTagTable(req,res); 
            res.locals.condition = {
                recipe_id: _recipeIds
            }
            console.log(res.locals.condition);
            next();
        } else {
            next();
        }
    },

    make1DArray: (temp) =>{
        const originalArray = temp;
        const newArray = [];

        for (let i =0; i<originalArray.length; i++){
            if(Array.isArray(originalArray[i])){
                // 배열일 경우, 각 요소를 새로운 배열에 push
                newArray.push(...originalArray[i]);
            } else{
                // 배열이 아닌 경우 그대로 push
                newArray.push(originalArray[i]);
            }
        }
        const uniqueArray = [...new Set(newArray)];

        console.log(uniqueArray);
        return uniqueArray;
    },

    checkSearchValue: async (req, res, next)=>{
        // 정렬 
        /* if (req.query.sort) {
            const sort = req.query.sort;
            // 최신순latest = [["createdAt", "DESC"]],
            // 조회수순 = [["viewCount", "DESC"]],
            // 좋아요 순 = 이건 나중에 - 레시피, 게시판, 모임별 다 따로 
            if (sort == "viewCount") {
                res.locals.sort = [["viewCount", "DESC"]]
            }
            else if(sort == "earliest"){
                res.locals.sort = [["createdAt", "ASC"]]
            }
            // else if(sort=="like"){
            // }
        }
        */

        // searchType이 없으면 다.
        // ㅠㅠ 작성자로 하려면 따로 빼야했네,,,,,,,,,ㅓㅏ
        if(!req.query.keyword){
            // 검색어 없으면
            res.locals.condition = { recipe_id: 0 };
            next();
        }
        //검색어가 있으면

        const temp = [];
        switch(req.query.searchType) {
            case 'WRITER':
                temp.push(await module.exports.searchRecipeTable(req, res));
                break;
            case 'TITLE':
                temp.push(await module.exports.searchRecipeTable(req, res));
                break;
            default: // case 'CONTENT':
                temp.push(await module.exports.searchTagTable(req, res));
                temp.push(await module.exports.searchRecipeTable(req, res));
                temp.push(await module.exports.searchStepTable(req, res));
                temp.push(await module.exports.searchIngredientTable(req, res));
                break;
        }
        console.log('temp', temp);
        const uniqueArray = module.exports.make1DArray(temp);
        res.locals.condition = {
            recipe_id: uniqueArray
        }
        console.log('페이지네이션에 들어갈 where 조건 - [checkSearchValue]', res.locals.condition);
        // const result = await db.recipe.findAll({
        //     where:res.locals.condition,
        //     group: 'recipe_id',
        //     raw: true
        // });
        // console.log('이 상태로 검색이 되는지 확인: ', result);
        next();
    },

    // ⚠️⚠️⚠️Search--> !temp인 경우, 검색 0나오게  col에 없는 조건
    searchTagTable: async(req, res)=>{
        console.log('2');
        var temp = {};
        // 태그별로 리스트업 할때도 이거 쓸거임. showRecipeListPage
        try {
            const keyword = req.query.keyword;
            const tagVal = req.params.tag;
            var condition;
            if (keyword) {
                condition = {
                    tag_name: {
                        [Op.like]: `%${keyword}%`
                    },
                }
            } else if (tagVal) {
                condition = {
                    tag_name: tagVal,
                }
            }
            // title, menu, intro, writer_id 확인
            temp = await db.recipe_tag.findAll({
                attributes: ['recipe_id', 'recipe_id'],
                include: {
                    model: db.tag,
                    attributes: ['tag_id', 'tag_id'],
                    where: condition,
                    as: "tag"
                },
                raw: true, // raw 속성을 true로 설정하면 결과를 순수한 JSON 객체로 얻을 수 있습니다.
                // group: "recipe_id"
            });
        } catch (err) {
            console.log('[ERROR] while searching recipe_tag', err);
            throw(err);
        }

        if (!temp || temp.length === 0) {
            // ⚠️근데 이렇게 하면 앞에 있는 애들이 사라지자나. /list/:tag만 하니까 상관업나
            res.locals.condition= {
                where:{ recipe_id: 0 }
            }
            return false;
        } else {
            console.log('raw: 테스트', temp);
            // const _recipeIds = 1;
            const _recipeIds = temp.map(data => data.recipe_id);    //raw: 테스트 [ { recipe_id: 1 }, { recipe_id: 1 } ] 
            // raw: 테스트 [ { recipe_id: 2, 'tag.tag_id': 1 } ]
            console.log('findAll결과:', _recipeIds);    //findAll결과: [ 1, 2 ]
            // res.locals.condition = {
            //     recipe_id: _recipeIds
            // }
            return _recipeIds;
        }
    },
    
    searchStepTable: async(req, res)=>{ //✅
        console.log('searchStepTable');
        //태그 검색어 검색
        var temp = {};
        try {
            const keyword = req.query.keyword;
            // title, menu, intro, writer_id 확인
            temp = await db.recipe_step.findAll({
                attributes: ['recipe_id', 'recipe_id'],
                where: {
                    content: {
                        [Op.like]: `%${keyword}%`
                    },
                },
                raw: true, // raw 속성을 true로 설정하면 결과를 순수한 JSON 객체로 얻을 수 있습니다.
                group: "recipe_id"
                // distinct: true // distinct 옵션을 사용하여 중복을 제거합니다.
            });
        } catch (err) {
            console.log('[ERROR] while searching recipe_step', err);
        }
        if (!temp || temp.length === 0) {
            return false;
        } else {
            console.log('raw: 테스트', temp);
            const _recipeIds = temp.map(data => data.recipe_id);    //raw: 테스트 [ { recipe_id: 1 }, { recipe_id: 1 } ]
            console.log('findAll결과:', _recipeIds);    //findAll결과: [ 1, 2 ]
            return _recipeIds;
        }
    },
    searchIngredientTable: async(req, res)=>{   //✅
        var temp = {};
        try {
            const keyword = req.query.keyword;
            // title, menu, intro, writer_id 확인
            temp = await db.recipe_ingredient.findAll({
                attributes: ['recipe_id', 'recipe_id'],
                where: {
                            name: {
                                [Op.like]: `%${keyword}%`
                            },
                },
                raw: true, // raw 속성을 true로 설정하면 결과를 순수한 JSON 객체로 얻을 수 있습니다.
                group: "recipe_id"
                // distinct: true // distinct 옵션을 사용하여 중복을 제거합니다.
            });
        } catch(err){
            console.log('[ERROR] while searching recipe_ingredient', err);
        }
        if(!temp || temp.length === 0){
            return false;
        } else {
            console.log('raw: 테스트', temp);
            const _recipeIds = temp.map(data => data.recipe_id);    //raw: 테스트 [ { recipe_id: 1 }, { recipe_id: 1 } ]
            console.log('findAll결과:', _recipeIds);    //findAll결과: [ 1, 2 ]
            return _recipeIds;
        }
    },

    searchRecipeTable: async(req, res)=>{   //✅
        var temp = {};
        try {
            const keyword = req.query.keyword;
            const searchType = req.query.searchType;
            console.log(searchType, '검색어');
            var tempCondition = {};
            switch (searchType){
                case 'WRITER':
                    tempCondition = {
                        writer_id: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                    break;
                case 'TITLE':
                    tempCondition = {
                        title: {
                            [Op.like]: `%${keyword}%`
                        },
                    };
                    break;
                case 'CONTENT': 
                    tempCondition = {
                        [Op.or]: [
                            {
                                menu: {
                                    [Op.like]: `%${keyword}%`
                                }
                            },
                            {
                                intro: {
                                    [Op.like]: `%${keyword}%`
                                }
                            },
                        ]
                    }
                    break;
                default: 
                    tempCondition = {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: `%${keyword}%`
                                },
                            },
                            {
                                menu: {
                                    [Op.like]: `%${keyword}%`
                                }
                            },
                            {
                                intro: {
                                    [Op.like]: `%${keyword}%`
                                }
                            },
                            {
                                // 다 mem_id로 바꿔버려?
                                writer_id: {
                                    [Op.like]: `%${keyword}%`
                                }
                            }
                        ]
                    };
                    break;
            }
                
            // title, menu, intro, writer_id 확인
            temp = await db.recipe.findAll({
                attributes: ['recipe_id', 'recipe_id'],
                where: tempCondition,
                group: "recipe_id"
            });
            console.log('writer 확인',temp);
        } catch(err){
            console.log('[ERROR] while searching recipe_tag', err);
        }
        if(!temp || temp.length === 0){
            return false;
        } else{
            console.log('raw: 테스트', temp);
            const _recipeIds = temp.map(data => data.recipe_id);    //raw: 테스트 [ { recipe_id: 1 }, { recipe_id: 1 } ]
            console.log('findAll결과:', _recipeIds);    //findAll결과: [ 1, 2 ]
            return _recipeIds;
        }
    },

    getPaginationInfo: async (req, res, next)=>{
    // ❤️ condition을 req.query로 받아도 되지 않을까? 라우터가 넘 번잡해

    // res.locals에 model, condition이 저장되지 않았으면 에러 페이지 이동하게 해야함.
    const model = db.recipe;
    const condition = res.locals.condition;

    //res.redirect("/board/" + 1);
    // 한페이지에 보여질 포스트 개수
    var countPerPage = req.query.countperpage;
    // 페이지 번호
    var pageNo = req.query.pageno;
    // 세트 사이즈
    var setSize = req.query.setsize;
    
// pageNo는 현재페이지. setPagingVar는 값이 안정해졌을 때, 임의로 정하는 것임.
    // 여기서 한 페이지당 글 개수, 페이지, 1,10까지 보여준는 거.
    countPerPage = setPagingVar(countPerPage, 10);
    pageNo = setPagingVar(pageNo, 1);  
    // //❓query 스트링이 페이지 범위를 넘어가면
    if (pageNo < 0 || pageNo > totalPage) {
        pageNo = 1;
    }
    setSize = setPagingVar(setSize, 10);

    // 특정 게시판도 글 개수 세기
    var totalPost = await model.count({
        where: condition,
    }).catch((err) => {
        console.log(`ERROR: while counting recipe. ${err.message}`);
    });
    if (totalPost < 0) {
        totalPost = 0;
    }
    // // 총 페이지 수
    var totalPage = Math.ceil(totalPost / countPerPage);
    // // 총 세트 수
    var totalSet = Math.ceil(totalPage / setSize) // ejs 건네줄 필욘ㄴ 없는듯
    // 현재 세트
    var curSet = Math.ceil(pageNo / setSize);
    // 페이지  < 사이 값 >
    var startPage = (curSet - 1) * setSize + 1;
    var endPage = startPage + setSize - 1;
    var previousPage = 0, nextPage = 0;    // 이거는 ejs에서 js 코드 써야겠다.
    // 글 번호. 페이징할 때
    var startItemNo = (pageNo - 1) * countPerPage;    // itemOffset이 낫겠어
    // console.log(startItemNo, '해당 페이지의 글 번호');
    var endItemNo = Math.min(startItemNo + countPerPage - 1, totalPost);   // 수정좀 if로 따로 하는게 낫나?
    if (curSet == 1) {
        previousPage = 0;// < 표시 안해
    } else {
        previousPage = startPage - 1;
    }
    if (curSet == totalSet) {   // 마지막 set이면
        nextPage = 0; // > 표시 안해
        endPage = totalPage;
        endItemNo = totalPost;  //얜 별개인가?
    } else {
        nextPage = endPage + 1;
    }

    //위에 카운트에서도 되던게 여기선 안되는매직
    try {
        const dataList = await model.findAll({
            where: condition,
            order: res.locals.sort? res.locals.sort: [["createdAt", "DESC"]],
            limit: countPerPage,
            offset: startItemNo
        });
        res.locals.dataList = dataList;
        // console.log('middleware - pagination - dataList 값 확인:', dataList, typeof dataList);
    } catch (err) {
        console.log('[Error]: while getting data from DB -mw', err.message);
    }
    // 빈 값은 [] == ''

    paginationInfo = {};
    paginationInfo.pageNo = pageNo; // 현재 페이지 볼드 표시
    paginationInfo.curSet = curSet; // ⚠️필요할까?
    paginationInfo.countPerPage = countPerPage; // ⚠️필요할까?
    paginationInfo.setSize = setSize;   // ⚠️세트 10 사이즈 필요해?
    paginationInfo.totalPost = totalPost; // 총 글 개수가 필요해? 글 몇개 있는지 상단에 표시하자
    paginationInfo.totalSet = totalSet; //⚠️필요해?   몇 세트 있는지 필요해?
    paginationInfo.totalPage = totalPage;
    paginationInfo.startPage = startPage;   // 하단 첫번째 페이지 번호
    paginationInfo.endPage = endPage;   // 하단 마지막 페이지 번호
    paginationInfo.previousPage = previousPage; // 하단 < 링크
    paginationInfo.nextPage = nextPage; // 하단 > 링크
    paginationInfo.startItemNo = startItemNo; // 글 번호 표기할 때 필요. // 이거하면 좋겠는데.
    paginationInfo.endItemNo = endItemNo;

    // console.log('middleware - paginationinfo 값 확인:', paginationInfo);    //, typeof paginationInfo
    res.locals.paginationInfo = paginationInfo;
    // console.log('middleware - paginationinfo 값 확인:', res.locals.paginationInfo); 
    // console.log('middleware - datalist chck ', res.locals.dataList);
    return next();
}



    // 태그 검색 함수
    // https://jeonst.tistory.com/35
}