// recipe controller
const { db, sequelize } = require("../models/index");
const recipe = require("../models/recipe");

module.exports={
    // 사용자 좋아요 테이블에서 recipe_tag나 작성한 레시피 recipe_tag 가져와서 
    // recipe_tag 의 notice_id 찾아서 ==> recipe 테이블에서 검색한 거 
    // 일부 보여주기. 
    // 함수로 만들어야하나? limit: 주고
    showMainPage: async (req, res)=>{
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

        res.render("recipeMain");
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
            // 태그 종류 표시
            obj.tagNameList = res.locals.tagNameList;
            obj.tagIdList = res.locals.tagIdList;

            // console.log(`[TEST] SHOWMAINPAGE`, obj);
            // obj.operator = req.operator;
            // res.json(obj.dataList);
            // console.log(obj.dataList[0]);

            // dataList로 recipeId 배열 만들기
            const recipeIds = obj.dataList.map(recipe=> recipe.dataValues.recipe_id);
            console.log('recipeIds: ', recipeIds);

            // tag들 정리
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
                        }]
                })
                obj.tagList[index].tags = result.map(tag=> tag.dataValues.tag_name); 
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
        res.render('recipeList', obj);
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
        if(!res.locals.tagNameList || !res.locals.tagIdList){
            console.log('[ERROR] There is no tag name or id list');
            res.redirect("/recipe");
        }
        obj.tagNameList = res.locals.tagNameList;
        obj.tagIdList = res.locals.tagIdList;

        try {
            obj.recipeId = req.query.recipe_no;
            // obj.operator_id = req.operator.id;
            res.render('recipeWrite', obj);
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

        if (!req.query.recipe_no) {
            res.redirect('/recipe');
            console.log(`[Error]: There's no recipe_no in url - showUpdatePage`);
        }

        const obj = {};
        var temp = {};
        const recipeId = req.query.recipe_no;
        try {
            // recipe 정보 가져오기
            temp = await db.recipe.findOne({
                attributes: ['recipe_id', 'title', 'menu', 'intro', 'cookTime', 'cookLevel', 'imageURL', 'viewCount'],
                where: { recipe_id: recipeId }
            })
            obj.dataList = temp.dataValues;
            console.log(obj.dataList, '값확인');

            // ⚠️태그는 write처럼 전체 태그 가져오고, 검색한 걸를 selected tag로 해서
            // 같으면 선택 처리 해야할 거 같음..⚠️ 그렇게 하면 굳이 이름을 가져올 필요까지는 없음.
            // recipe_tag 정보 가져오기
            temp = await db.recipe_tag.findAll({
                attributes: ['tag_id', 'tag_id'],
                where: { recipe_id: recipeId }
            });
            // ⚠️dataValues로 하면 안되고 매핑해야할 거 같음
            obj.selectedTagIdList = temp.dataValues;

            // recipe_step 가져오기
            temp = await db.recipe_step.findAll({
                attributes:[['step_no', 'step_no'], ['content', 'content'], ['imageURL','imageURL']],
                where: {recipe_id: recipeId }
            });
            // ⚠️dataValues로 하면 안되고 매핑해야할 거 같음
            obj.stepList = temp.dataValues;

            // recipe_ingredient 가져오기
            temp = await db.recipe_ingredient.findAll({
                attributes:[['name', 'name'],
                //  ['imageURL','imageURL']
                ],
                where: {recipe_id: recipeId }
            });
            // ⚠️dataValues로 하면 안되고 매핑해야할 거 같음
            obj.ingredientList = temp.dataValues;
            
        } catch (err) {
            console.log(`[Error] cannot get recipe data from DB - showUpdatePage.- recipe`, err);
            res.redirect('/recipe');
        }

        // 관리자 아이디 obj에 너허어
        // obj.operator_id = req.operator.id;
        res.render('recipeUpdate', obj);
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
        if (req.user) {
            obj.user = req.user;
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
            obj.dataList = await db.recipe.findOne({
                where: { recipe_id: recipeId }
            });

            // 재료
            // ❓dataValues 해야하나?
            obj.ingredientList = await db.recipe_ingredient.findAll({
                where: { recipe_id: recipeId }
            });
            // 요리 순서 
            obj.stepList = await db.recipe_step.findAll({
                where: { recipe_id: recipeId }
            });

            // 태그
            const temp = await db.tag.findAll({
                attributes: ['tag_name', 'tag_name'],
                include: [{
                    model: db.recipe_tag,
                    attributes: ["tag_id", "tag_id"],
                    where: { recipe_id: recipeId },
                    as: "recipe_tags"
                }]
            })
            // ❓맞나??
            obj.tagList = temp.map(data=> data.dataValues.tag_name);
            console.log(`showRecipe컨트롤러 ojb 확인:`, obj.dataList);
        } catch (err) {
            console.log(`[ERROR] select a recipe - showRecipe`, err);
            res.redirect('/recipe',);
        }
            res.render('recipeView', obj);
    },

    // # 해시태그로 검색은??❓
    searchRecipe: (req, res)=>{
        
        // 불러올 것. recipe_id로
        // recipe
        // recipe_ingredient 
        // recipe_step

        // 이것도 "검색어"가 있다는 거 빼곤 showRecipeListPage랑 같음.
        // 아직 몰라
    },
    createRecipe: async (req, res)=>{
        // method='POST'
        
        // recipe - recipe_id 로 테이블(tag, step, ingredient)에 데이터 추가
        if (!req.body) {
            console.log(`[ERROR] Req.params are not sent. - createRecipe`);
            res.redirect('/recipe');
        }

        console.log(req.body);
        console.log("태그 값이 여러개면",req.body.tag, req.body.tag);

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
        const recipe_tag_data = this.setRecipeTagData(req,res);
        // ingredients 저장
        const ingredient_data = this.setRecipeIngredientData(req, res);
        // step 요리 단계 저장
        const step_data=this.setRecipeStepData(req,res);
        // db 3개 저장
        try{
            await sequelize.transaction(async t=>{
                // 태그 저장장
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
            console.log('[ERROR] Transaction failed: ',err);
        }

        
        res.redirect(`/recipe/view?recipe_no=${data.recipe_id}`);
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
        console.log('[updateRecipe-ctrl] recipe_id: ', recipeId);
        
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
                    where: { recipe_no: recipeId },
                    transaction: t
                });
                // step
                await db.recipe_step.destroy({
                    where: { recipe_no: recipeId },
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
        const recipe_tag_data = this.setRecipeTagData(req,res);
        // ingredients 저장
        const ingredient_data = this.setRecipeIngredientData(req, res);
        // step 요리 단계 저장
        const step_data=this.setRecipeStepData(req,res);
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
            res.redirect(`/recipe/view?no=${recipeId}`)
        }

        // 해당 레시피로 리디렉션
        res.redirect(`/recipe/view?no=${recipeId}`);
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
    
    getTagNameList: async(req, res, next)=>{
        try {
            const result = await db.tag.findAll({
                attributes: [['tag_id','tag_id'], ['tag_name','tag_name']],
            })

            res.locals.tagNameList = result.map(data => data.dataValues.tag_name);
            res.locals.tagIdList = result.map(data=> data.dataValues.tag_id);
            // [
            //     1, 2, 3, 4,  5,
            //     6, 7, 8, 9, 10,
            //    11
            //  ]
            next();
        } catch (err) {
            console.log('[ERROR] While get tagname list',err);
            res.redirect('/recipe');
        }
    },
    setRecipeTagData:(req, res)=>{
        const recipeId = req.locals.recipeId;
        const tags = req.body.tag;
        const recipe_tag_data = [];
        for(let i =0; i<tags.length; i++){
            const tagObj = {
                recipe_id: recipeId,
                tag_id: tags[i]
            }
            recipe_tag_data.push(tagObj);
        };
        return recipe_tag_data;
    },
    setRecipeIngredientData:(req, res)=>{
        const recipeId = req.locals.recipeId;
        const ingredients = req.body.ingredient;
        const ingredient_data=[];
        for(let i=0; i<ingredients.length; i++){
            const ingredientObj = {
                recipe_id: recipeId,
                name: ingredients[i],
            }
            ingredient_data.push(ingredientObj);
        };
        return ingredient_data;
    },
    setRecipeStepData:(req, res)=>{
        const recipeId = res.locals.recipeId;
        const steps = req.body.step;
        const step_data=[];
        for(let i=0; i<steps.length; i++){
            const stepObj = {
                recipe_id: recipeId,
                step_no: i+1,
                content: steps[i],
                // imageURL: 
            }
            step_data.push(stepObj);
        };
        return step_data;
    },
    setLike: async(req, res)=>{
        console.log('[setLike] 도착');
        // post 방식

        if(!req.user){
            console.log('[ERROR] Not logged in user is trying to push like.');
            res.json({success: false});
        }

        if(!req.body.recipeId || !req.body.isLiked){
            console.log('[ERROR] recipe id and isLiked value are not sent.');
            res.json({success: false});
        }
        const recipeId = req.body.recipeId;
        const memId = req.user.mem_id;
        const likeClicked = req.body.isLiked || 0;
        console.log('[setLike-recipe] recipe_id:', recipeId, 'likeClicked: ', likeClicked);

        // recipe_like 수정시작
        try{
            await sequelize.transaction(async t=>{
                await db.recipe_like.findOne({
                    where: {
                        recipe_id: recipeId,
                        mem_id: memId,
                    }
                }). then(async existingRecord=>{
                    if(existingRecord){
                        console.log('recipe_like UPDATE');
                        // 그 row 가지고?
                        const result = await existingRecord.update(
                            {isLiked: likeClicked},
                            {transaction: t}
                        )
                        return result;  //⚠️ return 하면 어디감?
                    } else{
                        //존재하지 않는 경우
                        console.log('recipe_like CREATE');
                        const result = await db.recipe_like.create({
                            recipe_id: recipeId,
                            mem_id: memId,
                            isLiked: true
                        });
                        return result;
                    }
                }).catch(err=>{
                    console.log('[ERROR] setLike - recipe ctrl: ', err);
                });
                //.then(result => {
                //     console.log('레코드 업데이트 또는 생성 완료: ', result);
                // })

                
                // ⚠️(따로빼기) 좋아요 수 업데이트 확인
                const likeCount = await db.recipe_like.count({
                    where: {
                        recipe_id: recipeId,
                        isLiked: { [Op.eq]: 1 }
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

                res.json({success: true, message: '좋아요를 눌렀습니다!', likeCount: likeCount, isLiked: isLiked});
            })
        } catch(err){
            console.log('[ERROR] setLike - recipe ctrl: ', err);
            res.json({success: false});
        }

        // 좋아요 수 세는 함수 만들기 --> 1) showRecipe(/view) 2) setLike

    },

    // POST /newComment
    createComment : async(req, res)=>{
        if(!res.body){
            res.json({success: false, message:'댓글 내용이 없습니다. 다시 시도해주세요.'});
        }

        try{
            await sequelize.transaction(async t=>{
                await db.recipe_comment.create({
                    recipe_id: req.body.recipeId,
                    mem_id: req.user.mem_id,
                    content: req.body.content
                })
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
        } catch(err){
            // res.redirect('/');
            next(err);
        }
    },
    showComment: async(req, res)=>{
        const obj = {};
        try {
            obj.success = true;
            obj.page = res.locals.commentInfo.pagination.totalpage;
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



    // 1) TAG, STEP, INGREDIENT CREATE하는 함수



    // 레시피 리스트 가져오는 함수, 페이지네이션 새로 해야할거 같은데
    // 페이지네이션 함수를 또 가져오긴 그렇고, 
    // 그전 미들웨어에서 tag, recipe_tag 조인하고 tag_name으로 recipe_id를 찾아서 그 레시피만 가져와.
    // 태그 검색 함수
    // https://jeonst.tistory.com/35
}