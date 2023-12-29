// myRoom Controller
const { db, sequelize } = require("../models/index");
const { Op, Sequelize } = require('sequelize');

module.exports={
    //
    showMainPage: (req, res)=>{
        const obj = {};
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }
        if(typeof req.user == 'undefined'&& !req.user){
            // res.write("<script>alert('로그인이 필요합니다.');</script>");
            res.redirect('/auth/login');
        } else{
            res.render('myroom/myroom', obj);
        }
    },
    // 1-a) 비번 변경 화면
    showChangePwPage: (req, res)=>{
        const obj = {};
        obj.curPage = 'changePw';
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }
        res.render('myroom/myroomCPW', obj);  
    },
    // 1-b) 프로필 수정
    showModifyPage: async (req, res)=>{
        const obj = {};
        obj.curPage = 'modify';
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            try{
                const result = await db.member.findOne({
                    where: { mem_id: memId },
                    raw: true
                });
                obj.user = result;

            } catch(err){
                console.log('[ERROR] While searching member data', err);
                res.redirect('/gather');
            }
            // obj.user = req.user;
        }
        res.render('myroom/myroomModify', obj);

    },
    // ⚠️1-c) 계정 탈퇴
    showWithdrawPage: (req, res)=>{
        const obj = {};
        obj.curPage = 'withdraw';
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }

        res.render('myroom/myroomWithdraw', obj);

    },
    // ✅1-d) 비밀번호 확인 화면
    showCheckPwPage: (req, res, next)=>{
        const obj = {};
        const url = req.url.split('/',2).join('');
        obj.curPage = url;
        // console.log(url, '확인', 'curPage확인', obj.curPage);
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }

        switch (url){
            case 'changePw':
                obj.phrase = '비밀번호 수정을 위해 비밀번호를 다시 한 번 입력해주세요❗';
                break;
            case 'modify':
                obj.phrase = '개인정보 수정을 위해 비밀번호를 다시 한 번 입력해주세요❗';
                break;
            case 'withdraw':
                obj.phrase = '회원 탈퇴를 위해 비밀번호를 다시 한 번 입력해주세요❗';
                break;
            default:
                obj.phrase = '비밀번호를 다시 한 번 입력해주세요';
                break;
        }
        // console.log(obj);
        res.locals.obj = obj;
        res.render('myroom/myroomCheckPw', obj);
    },

    setMyPost: (req, res, next) => {
        res.locals.condition = { writer_id: req.user.mem_id }
        // console.log('setMyPostpage', res.locals.condition);
        next();
        // res.send('setMyPostpage');
    },
    showMyPost: (req, res) => {
        const obj = {};
        obj.curPage = 'boardPost';
        if (req.user) {
          obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
          console.log('[ERROR] check pagination data.');
          // res.redirect(res.locals.history);
          // res.redirect('/myroom');
        } 
        // else{
          obj.pagination = res.locals.paginationInfo;
          obj.dataList = res.locals.dataList;
        //   console.log('내가 쓴 글 목록:', obj);
        //   res.send(obj);
          res.render('myroom/myroomBPost', obj);
        // }
    },

    setMyPostComment: (req, res, next)=>{
        const memId = req.user.mem_id;
        // res.locals.condition = { writer_id: req.user.mem_id };
        res.locals.includeCondition ={
            model: db.post_comment,
            attributes: ['post_id', 'content'],
            where: {
                mem_id: memId,
            },
            as: 'post_comments'
        }
        // console.log('setMyPostpage', res.locals.condition);
        // console.log('setMyPostpage', res.locals.includeCondition);
        // res.send(res.locals.includeCondition);
        next();

    },
    showMyPostComment: (req, res)=>{
        const obj = {};
        obj.curPage = 'boardComment';
        if (req.user) {
          obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
          console.log('[ERROR] check pagination data.');
        } 
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;
        const commentList = [];
        for (let i=0; i<obj.dataList.length; i++){
            commentList[i] = {
                firstComment: obj.dataList[i].post_comments[0].content,
                count: obj.dataList[i].post_comments.length
            };
            //obj.dataList[i].post_comments.map(comment=>comment.content);
            console.log(i, obj.dataList[i].post_comments[0].content, obj.dataList[i].post_comments.length);
            // console.log(i, commentList[i]);
        }
        // console.log(obj.dataList[0].post_comments[0].content);
        // console.log('commentList', commentList);
        obj.commentList = commentList;
        // console.log('내가 쓴 글 목록:', obj);
        res.render('myroom/myroomBComment', obj);
    },
    setMyPostLike: (req, res, next)=>{
        const memId = req.user.mem_id;
        // res.locals.condition = { writer_id: req.user.mem_id }
        res.locals.includeCondition ={
            model: db.post_like,
            attributes: ['post_id', 'isLiked'],
            where: {
                mem_id: memId,
                isLiked: 1    //isLiked
            },
            as: 'post_likes'
        }
        // console.log('setMyPostpage', res.locals.condition);
        // console.log('setMyPostpage', res.locals.includeCondition);
        next();
    },
    showMyPostLike: (req, res)=>{
        const obj = {};
        obj.curPage = 'boardLike';
        if (req.user) {
          obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
          console.log('[ERROR] check pagination data.');
          // res.redirect(res.locals.history);
          // res.redirect('/myroom');
        } 
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;
        // console.log('내가 쓴 글 목록:', obj);

        res.render('myroom/myroomBLike', obj);
    },
    setMyRecipe: (req, res, next) => {
        res.locals.condition = { writer_id: req.user.mem_id }
        // console.log('setMyRecipepage', res.locals.condition);
        next();
        // res.send('setMyRecipepage');
    },
    showMyRecipe: (req, res) => {
        const obj = {};
        obj.curPage = 'recipePost';
        if (req.user) {
          obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
          console.log('[ERROR] check pagination data.');
          // res.redirect(res.locals.history);
          // res.redirect('/myroom');
        } 
        // else{
          obj.pagination = res.locals.paginationInfo;
          obj.dataList = res.locals.dataList;
        //   console.log('내가 쓴 글 목록:', obj);
        //   res.send(obj);
          res.render('myroom/myroomRPost', obj);
        // }
    },
    setMyRecipeComment: (req, res, next) => {
        const memId = req.user.mem_id;
        // res.locals.condition = { writer_id: req.user.mem_id }
        res.locals.includeCondition ={
            model: db.recipe_comment,
            attributes: ['recipe_id', 'content'],
            where: {
                mem_id: memId,
            },
            as: 'recipe_comments'
        }
        // console.log('setMyRecipepage', res.locals.condition);
        // console.log('setMyRecipepage', res.locals.includeCondition);
        next();
    },
    showMyRecipeComment: (req, res) => {
        const obj = {};
        obj.curPage = 'recipeComment';
        if (req.user) {
          obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
          console.log('[ERROR] check pagination data.');
          // res.redirect(res.locals.history);
          // res.redirect('/myroom');
        }
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;
        //   res.send(obj);
        const commentList = [];
        for (let i = 0; i < obj.dataList.length; i++) {
            commentList[i] = {
                firstComment: obj.dataList[i].recipe_comments[0].content,
                count: obj.dataList[i].recipe_comments.length
            };
            //obj.dataList[i].post_comments.map(comment=>comment.content);
            // console.log(i, commentList[i]);
            // console.log(i, obj.dataList[i].post_comments[0].content, obj.dataList[i].post_comments.length);
        }
        obj.commentList = commentList;
        // console.log('내가 쓴 글 목록:', obj);
        res.render('myroom/myroomRComment', obj);
    },
    setMyRecipeLike: (req, res, next) => {
        const memId = req.user.mem_id;
        // res.locals.condition = { writer_id: req.user.mem_id }
        res.locals.includeCondition ={
            model: db.recipe_like,
            attributes: ['recipe_id', 'isLiked'],
            where: {
                mem_id: memId,
                isLiked: 1    //isLiked
            },
            as: 'recipe_likes'
        }
        // console.log('setMyRecipepage', res.locals.condition);
        // console.log('setMyRecipepage', res.locals.includeCondition);
        next();
    },
    showMyRecipeLike: (req, res) => {
        const obj = {};
        obj.curPage = 'recipeLike';
        if (req.user) {
          obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
          console.log('[ERROR] check pagination data.');
          // res.redirect(res.locals.history);
          // res.redirect('/myroom');
        } 
        // else{
          obj.pagination = res.locals.paginationInfo;
          obj.dataList = res.locals.dataList;
        //   console.log('내가 쓴 글 목록:', obj);
        //   res.send(obj);
          res.render('myroom/myroomRLike', obj);
        // }
    },

    
}