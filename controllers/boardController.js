const { db, sequelize } = require('../models/index');
const { Op } = require('sequelize');
const path = require('path');
const { storeUrl, redirect } = require('../routes/middlewares');
const MODIFY = 1;

getPostParams = (info, modify, _memId)=>{
    // 작성자 추출. req.session.user? 아니면 req.user에서 id 가져와야하ㅁ.
    if(!modify){    // 생성
        return {
            category: info.category, //어디서 가져오지?
            writer_id: _memId,
            title: info.title,
            content: info.content,
            viewCount: 0,
            state: 0, //생성
            img_flag: 0
        }
    } else{
        const result = {
            category: info.category,
            writer_id: _memId,
            title: info.title,
            content: info.content,
        };
        return result;
    }
}

getPostLike = async(postId)=>{
    var count = 0;
    try{
        count = await db.post_like.count({
            where: {
                post_id: postId,
                isLiked: { [Op.ne]: 1 }
            }
        })
        return count;
    } catch(err){
        console.log(`Error: while get count of like ${err.message}`);
        return err;
    }
};

getPostComment = async(postId)=>{
    await db.post_comment.findAll({
        where:{post_id: postId}
    }).then((comments) => {
        return comments;
    }).catch((err)=>{
        console.log(`Error: while get comment of post ${err.message}`);
    })
}

module.exports = {
    showBoardPage: async(req, res)=>{
        if (res.locals.paginationInfo && res.locals.dataList) {
            const obj ={};
            obj.user = req.user;
            obj.pagination = res.locals.paginationInfo;
            obj.dataList = res.locals.dataList;
            obj.pathname = req.params.category? '/'+req.params.category: '';
            res.render('board/board', obj);
        } else {
            res.send("문제: 게시판 showPage");
            res.redirect("/board");
        }
    },
    
    showPost: async (req, res) => {
        if (!req.query.no) {
            res.locals.second = "/board";
            redirect(req,res);
        }
        const obj = {};
        const postId = req.query.no;
        try {
            await sequelize.transaction(async t => {// 조회수 카운팅
                await db.post.update( 
                    { viewCount: sequelize.literal('viewCount + 1') },
                    {
                        where: { post_id: postId },
                        transaction: t
                    });
            });
            obj.post = await db.post.findOne({
                where: { post_id: postId }
            });

            obj.post.content = obj.post.content.replaceAll(/\r\n/g, '<br>');
            

            obj.likeInfo = {};
            if (req.user) {
                obj.user = req.user;
                const result = await db.post_like.findOne({ attributes: ['isLiked'], where: { post_id: postId, mem_id: req.user.mem_id } });
                obj.likeInfo.isLiked = result ? result.isLiked : false;
            }
            const likeCount = await db.post_like.count({ where: { post_id: postId, isLiked: { [Op.eq]: 1 } } });
            obj.likeInfo.likeCount = likeCount;

            // 댓글 정보 불러오기
            if (res.locals.commentInfo) {
                obj.commentInfo = res.locals.commentInfo;
            }
            res.render("board/boardPost", obj);

        } catch (err) {
            console.log(`Error: there're some errors in showPost. ${err.message}`);
            res.redirect("/board");
        };
    },

    showWritePage: (req, res)=>{
        try{
            res.render("board/boardWrite", { user: req.user });
        } catch(err){
            redirect(req,res);
        }
    },

    showUpdatePage: async(req, res)=>{
        const obj = {};
        if(!req.user){
            console.log('[ERROR] This user is not logged in.');
            res.redirect('/board');
        }
        const _memId = req.user.mem_id;
        obj.user = req.user;

        if(!req.query.no){
            console.log('[ERROR] There is no post number');
            res.redirect('/board');
        }
        const _postId = req.query.no;
        
        const data = await db.post.findOne({
            where: {
                writer_id: _memId,
                post_id: _postId
            }
        });
        if(!data || data.length==0){
            res.redirect(`/board/post?no=${_postId}&pageno=1&sort=earliest`);
            console.log('[ERROR] 수정 권한이 없는 글입니다.');
        }
        obj.data = data;

        res.render("board/boardUpdate", obj);
    },

    writePost: async(req, res)=>{
        var postData = getPostParams(req.body, 0, req.user.mem_id);
        console.log('test', postData);
        try {
            await sequelize.transaction(async t => {
                    const result = await db.post.create(postData, { transaction: t });
                    res.redirect(`/board/post?no=${result.dataValues.post_id}&pageno=1&sort=earliest`);
            })
        } catch (err) {
            console.log(`Error saving post: ${err.message}`);
            res.locals.secondUrl = "/board";
            redirect(req, res);
        }
    },

    //게시글 수정
    updatePost: async(req, res) => {
        const obj = {};
        // validation
        if(!req.user){
            console.log('[ERROR] This user is not logged in.');
            res.redirect('/board');
        }
        const _memId = req.user.mem_id;
        obj.user = req.user;

        if(!req.query.no){
            console.log('[ERROR] There is no post number');
            res.redirect('/board');
        }
        const _postId = req.query.no;

        if(!req.body){
            console.log('[ERROR] There is no value from client');
            res.redirect('/board');
        }
        
        // // update 결과값도 확인하기
        var postData = getPostParams(req.body, MODIFY, _memId);
        try {
            await sequelize.transaction(async t => {
                //  const data 붙임
                const result = await db.post.update(postData, {
                    where: { post_id: _postId, },
                    transaction: t,
                    raw: true
                });
                res.redirect(`/board/post?no=${_postId}&pageno=1&sort=earliest`);
            })
        } catch (err) {
            console.log(`Error saving post: ${err.message}`);
            res.locals.secondUrl = "/board";
            redirect(req, res);
        }
    },

    deletePost: async(req, res)=>{
        if (!req.user) {
            // 로그인 상태 아니면
            res.redirect('/board');
        }
        const memId = req.user.mem_id;
        // query no있는지 체크
        if (!req.query.no) {
            console.log("There's no number of post to delete");
            res.redirect('/board');
        }
        const postNo = req.query.no;
        // 글 삭제
        try {
            await sequelize.transaction(async t => {
                await db.post.destroy({
                    where: { post_id: postNo, writer_id: memId },
                    transaction: t,
                })
            })
            res.redirect('/board');
        } catch (err) {
            console.log('[ERROR] While deleting a post.', err);
            res.redirect('/board');
        }
    },

    // 작성자가 아니면 /board로 리디렉션
    checkWriter: async(req, res, next)=>{
        if(!req.user){
            console.log('[Wrong Access] This user is not logged in.');
            res.redirect('/board');
        }
        if(!req.query.no){
            console.log('[Wrong Access] This user is approaching in the wrong way. There is no post number');
            //previousUrl로 이동
        }
        const memId = req.user.mem_id;
        const postId = req.query.no;
        console.log('[checkWriter] check data. memId: ', memId, 'postId: ', postId);
        try{
            const check = await db.post.findOne({
                attributes: ['post_id', 'writer_id'],
                where: {
                    post_id: postId,
                    writer_id: memId
                }
            });
            if(check&& memId == check.dataValues.writer_id ){
                next();
            } else{
                redirect(req,res);
            }
        } catch(err){
            console.log("[Wrong Access] This user isn't the writer", err);
            res.send(err);
        }
    },

    // req.params 값이 category 내의 값인지.
    checkBoard: (req,res,next)=>{
        const boards = {
            'restaurant': '맛집',
            'boast': '자랑',
            'tip': '꿀팁',
            'free': '자유',
            'share': '나눔',
            'mealfriend': '밥친구'
        };
        try{
            if (req.params.category && req.params.category in boards) {
                res.locals.category = boards[req.params.category];
                next();
            }
            else {
                res.redirect('/board');
            }
        } catch(err){
            next(err);
        }
    },

    setLike: async(req, res)=>{
    
        if(req.user && req.body.postId){
            const postId = req.body.postId; //req.query.no;
            const memId = req.user.mem_id;
            const likeClicked = req.body.isLiked || 0;

            try {
                await sequelize.transaction(async t => {
                    await db.post_like.findOne({
                        where: {
                            post_id: postId,
                            mem_id: memId,
                        },
                    }).then(async existingRecord => {
                        if (existingRecord) {
                            const result =  await existingRecord.update({
                                isLiked: likeClicked
                            },{transaction:t});
                            return result;
                        } else {
                            //존재하지 않는 경우
                            const result = await db.post_like.create({
                                post_id: postId,
                                mem_id: memId,
                                isLiked: true
                            },
                            { raw: true });
                            return result;
                        }
                    }).catch(error => {
                        console.log('좋아요 설정 오류:', error.message);
                    });
                });
                // 좋아요 수 업데이트 확인
                const likeCount = await db.post_like.count({
                    where: {
                        post_id: postId,
                        isLiked: { [Op.eq]: 1 }
                    }
                });
                // 좋아요 결과
                var result = await db.post_like.findOne({
                    attributes: ['isLiked'],
                    where: {
                        post_id: postId,
                        mem_id: memId,
                    }
                })
                const isLiked = result? result.isLiked: false;
                
                res.json({ success: true, message: '좋아요 성공적 처리', likeCount: likeCount, isLiked: isLiked });
            } catch (err) {
                console.log("[좋아요 설정 오류] ", err.message);
                res.json({success:false});
            }
        }
        
    },
    getCommentInfo: async (req, res, next)=>{
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log('[Error]: While setting commentInfo');
            next(err);
        }
        try {
            res.locals.commentInfo={};
            res.locals.commentInfo.pagination = res.locals.paginationInfo;
            res.locals.commentInfo.dataList = res.locals.dataList;
            res.locals.commentInfo.count = await db.post_comment.count({where:{post_id: req.query.no}});
            next();
        } catch(err){
            next(err);
        }
    },
    createComment: async (req, res, next) => {
        try{
            await sequelize.transaction(async t => {
                await db.post_comment.create({
                    post_id: req.body.postId,
                    mem_id: req.user.mem_id,
                    content: req.body.content
                }, { transaction: t })
            })
            next();
        } catch(err){
            console.log('[Error]: while push comment', err);
            next(err);
        }
    },
    showComment: async(req, res)=>{
        const obj ={};
        obj.success =true;
        obj.page = res.locals.commentInfo.pagination.totalPage;
        res.json(obj);
    },
    sendComment: (req, res)=>{
        //if문
        try{
            res.json({success:true, commentInfo: res.locals.commentInfo});
        } catch(err){
            res.json({success:false});
        }
    },

}
