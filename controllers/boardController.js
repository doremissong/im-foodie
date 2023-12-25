// const { isUndefined } = require('util');
const { db, sequelize } = require('../models/index');
const { Op } = require('sequelize');
const path = require('path');
const { storeUrl, redirect } = require('../routes/middlewares');
const MODIFY = 1;
/*
* 게시판 관련 기능
*
* 라우터 기본 주소 /board
* 
* < function list>
*   1. setPost , getPost
*   <export>
*   - showPage: 페이지네이션과 (next()) 이후 res.locals 데이터 전달.
* 
*   - getPost: 
* 
*   - writePost: 
* 
*   - showBoard: 특정 게시판 목록 보여주는 컨트롤러
*   
*   - updatePost: 게시글 수정하는 컨트롤러
* 
*   - deletePost: 게시글 삭제하는 컨트롤러
* 
*   - 좋아요(추천)
*   setLike(database, type, paramPostId, objectId, memId, cb)
*       : 좋아요 설정
*   getMemberLike (database, type, paramPostId, objectId, userId, cb)
*       : 해당 유저의 좋아요 여부 반환 -> 그러면 굳이 글 정보까지 있어야하나?
*   updateCount(database, isAdd, type, Id, cb)
*       : 게시글 좋아요 수 count++
* 
* 
* 
*   <x>
* 
*   - getPostParams; set으로 바꿔야하나?
*   ; post 생성시, 쿼리문에 들어갈 object
* 
*   - getPostLike: (postId, memId) - like controller로 빼는 것이 좋을까? (model, modelId, memId)
* 
*   - getPostComment: 마찬가지로 commentController??아님 미들웨어?
* 
*/
// paging info 빼는 함수 만들고
// paging 할 데이터 뺀느 함수.

// getBoardParams = (info, modify) => {
//     if (!modify) {   //생성
//         return {
    
//             create_date = Date.now(),   //첫번째면 이거고, 수정이면 가만히 둬야하는데,,, 매개변수 하나 둬서 0이면 초기. update는 1할까/ 근데 이걸 따로 
//             update_date = Date.now()
//         }
//     } else {    // 수정
//         return {
//             name = info.name,
//             create_date = Date.now(),   //첫번째면 이거고, 수정이면 가만히 둬야하는데,,, 매개변수 하나 둬서 0이면 초기. update는 1할까/ 근데 이걸 따로 
//             update_date = Date.now()
//         }
//     }

// };

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
            category: info.category, //어디서 가져오지?
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
    // await db.post_like.count({
    //     where: { post_id: postId }
    // }).then((count) => {
    //     return count;
    // }).catch((err)=>{
    //     console.log(`Error: while get count of like ${err.message}`);
    //     return err;
    // })
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
        // const category = req.query.category;
        // 카테고리
        if (res.locals.paginationInfo && res.locals.dataList) {
            const obj ={};
            obj.user = req.user;
            obj.pagination = res.locals.paginationInfo;
            obj.dataList = res.locals.dataList;
            obj.pathname = req.params.category? '/'+req.params.category: '';
            // storeUrl(req,res);
            res.render('board/board', obj);
        } else {
            res.send("문제: 게시판 showPage");
            res.redirect("/board");
        }
    },
    
    showPost: async (req, res) => {
        if (!req.query.no) {
            // res.send('board-showPost error 이전 페이지 연결');
            res.locals.second = "/board";
            redirect(req,res);
        }
        const obj = {};
        const postId = req.query.no;
        // 조회수 viewCount로 하고 db만 따로 설정해주고, postId는 쿼리로 받으면 된다.
        try {
            await sequelize.transaction(async t => {// 조회수 카운팅
                await db.post.update(    // 업데이트문 결과 확인: [ 1 ]
                    { viewCount: sequelize.literal('viewCount + 1') },
                    {
                        where: { post_id: postId },
                        transaction: t
                    });
            });
            obj.post = await db.post.findOne({
                where: { post_id: postId }
            });

            obj.likeInfo = {};
            // 개수도 필요한데, 유저 정보도 필요해. 이사람이 추천, 스크랩 했는지 안했는지
            if (req.user) {
                obj.user = req.user;
                const result = await db.post_like.findOne({ attributes: ['isLiked'], where: { post_id: postId, mem_id: req.user.mem_id } });
                obj.likeInfo.isLiked = result ? result.isLiked : false;
            }
            const likeCount = await db.post_like.count({ where: { post_id: postId, isLiked: { [Op.eq]: 1 } } });
            obj.likeInfo.likeCount = likeCount;

            // 댓글 정보 불러오기
            if (res.locals.commentInfo) {
                // obj.commentInfo = {};
                obj.commentInfo = res.locals.commentInfo;
                // console.log('obj 값 확인 : ', obj.commentInfo);
            }
            // storeUrl(req,res);
            console.log(obj);
            res.render("board/boardPost", obj);// { user: req.user, post: data, likeCount: likeCount,  });

        } catch (err) {
            // res.redirect(err)
            console.log(`Error: there're some errors in showPost. ${err.message}`);
            res.redirect("/board");
        };
    },

    showWritePage: (req, res)=>{
        try{
            // storeUrl(req,res);
            res.render("board/boardWrite", { user: req.user });
        } catch(err){
            redirect(req,res);
        }
        // res.sendFile(path.join(__dirname, "../public/html/board_write.html"));
    },

    showUpdatePage: async(req, res)=>{
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
        
        // update. 1)유저아이디, 2)기존 데이터 검색
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
        console.log('updatePost-data보내기전: ', obj);

        res.render("board/boardUpdate", obj);
        // res.send('hi working?');
    },

    writePost: async(req, res)=>{
        var postData = getPostParams(req.body, 0, req.user.mem_id);
        console.log('test', postData);
        // res.json(postData);
        try {
            await sequelize.transaction(async t => {
                //  const data 붙임
                    const result = await db.post.create(postData, { transaction: t });
                    console.log('create 결과: ',result);
                    console.log('uploading post success!');
                    res.redirect(`/board/post?no=${result.dataValues.post_id}&pageno=1&sort=earliest`);
            })
        } catch (err) {
            console.log(`Error saving post: ${err.message}`);
            // res.redirect("/board");
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
        console.log('updatePost 도착');
        
        // // update 결과값도 확인하기
        var postData = getPostParams(req.body, MODIFY, _memId);
        console.log('test', postData);
        console.log('post 전달값:', req.body);
        // // res.json(postData);
        try {
            await sequelize.transaction(async t => {
                //  const data 붙임
                const result = await db.post.update(postData, {
                    where: { post_id: _postId, },
                    transaction: t,
                    raw: true
                });
                console.log('update 결과: ', result);
                console.log('uploading post success!')
                res.redirect(`/board/post?no=${_postId}&pageno=1&sort=earliest`);
            })
        } catch (err) {
            console.log(`Error saving post: ${err.message}`);
            // res.redirect("/board");
            res.locals.secondUrl = "/board";
            redirect(req, res);
        }
    },

    deletePost: async(req, res)=>{
        //
        if (!req.user) {
            // 로그인 상태 아니면
            // res.redirect(res.locals.history);
            console.log('로그인 상태 확인');
            res.redirect('/board');
            // res.redirect(res.locals.history);
        }
        const memId = req.user.mem_id;
        // query no있는지 체크
        if (!req.query.no) {
            console.log("There's no number of post to delete");
            res.redirect('/board');
            // res.redirect(res.locals.history);
        }
        const postNo = req.query.no;
        //작성자가 맞는지 체크 ⚠️ 굳이 체크 안해도 될 거 같은데. 세션에서 정보 가져오고.
        // try {
        //     const postWriter = await db.post.findOne({
        //         attributes: ['writer_id'],
        //         where: {
        //             post_id: postNo,
        //         }
        //     })
        //     // recipeWriter.writer_id 제대로 동작할까?
        //     if (memId == postWriter.writer_id) {
        //         console.log('작성자임. 로그인한 사용자:', memId, '글의 작성자: ', postWriter.writer_id);
        //     }
        // } catch (err) {
        //     console.log('[ERROR]: while checking if user is the writer of the post', err);
        //     res.redirect('/board');
        //     // res.redirect(res.locals.history);
        // }
    
        // 글 삭제
        try {
            await sequelize.transaction(async t => {
                await db.post.destroy({
                    where: { post_id: postNo, writer_id: memId },// 로그인 유저로 검색하면 작성자 체크 굳이 안해도 되지
                    transaction: t,
                })
            })
            console.log('게시글 삭제 완료');
            res.redirect('/board');
        } catch (err) {
            console.log('[ERROR] While deleting a post.', err);
            res.redirect('/board');
            // res.redirect(res.locals.history);
        }
    },

    // 작성자가 아니면 /board로 리디렉션
    checkWriter: async(req, res, next)=>{
        // 얘네 미들웨어.js로 빼서 쓸까?
        if(!req.user){
            console.log('[Wrong Access] This user is not logged in.');
            res.redirect('/board');
            // res.send('req.user없음');
        }
        if(!req.query.no){
            console.log('[Wrong Access] This user is approaching in the wrong way. There is no post number');
            //previousUrl로 이동
        }
        const memId = req.user.mem_id;
        const postId = req.query.no;
        console.log('[checkWriter] check data. memId: ', memId, 'postId: ', postId);
        try{
            // console.time('select more than 2');
            const check = await db.post.findOne({
                attributes: ['post_id', 'writer_id'],
                where: {
                    post_id: postId,
                    writer_id: memId
                }
            });
            // console.log('[checkWriter] check result. isWriter: ',check.dataValues);//,isWriter&& memId == isWriter.post.writer_id );
            if(check&& memId == check.dataValues.writer_id ){
                // console.log('results: ', check&& memId == check.dataValues.writer_id );
                // storeUrl(req,res);
                // console.log(req.session.previousUrl);
                next();
                // res.send(req.session.previousUrl);
            } else{
                console.log('checkwriter 문제 ');
                // res.redirect('/board');
                redirect(req,res);
                // res.send('뭔가잘못');
            }
            // console.timeEnd('select more than 2');
        } catch(err){
            console.log("[Wrong Access] This user isn't the writer", err);
            res.send(err);
            // res.redirect("/board");
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
                // params 가 있고 카테고리 안에 있으면!
                res.locals.category = boards[req.params.category];
                // res.locals.additionalPath = req.parms.category;
                // res.send(`category's VAlue: ${category}`);
                next();
            }
            else {
                // res.send('wrong access..!\n Go back to home');
                // next로 메시지 넘기는 것도 되나?
                res.redirect('/board');
            }
        } catch(err){
            next(err);
        }
    },

    // 어떻게 해야하지? setLike를 미들웨어로 두는게 나을까? 
    // like가 가능한 기능은 2가지: 1) 게시판 2) 레시피 (이후에 3) 밥모임)
    setLike: async(req, res)=>{
        // mem_id, post_id, 가져오는 거.
        // 1이면 0으로 변경
        //이 이프 문 안에 넣기
        console.log(req.body.postId, req.body.isLiked, '컨트롤러setLike - fetch로 전달받은 값');
    
        if(req.user && req.body.postId){
            const postId = req.body.postId; //req.query.no;
            const memId = req.user.mem_id;
            const likeClicked = req.body.isLiked || 0;
            console.log('[setLike - postId, isLiked 결과]: ', postId, likeClicked);

            try {
                // if(likeClicked){    //좋아요 x => 좋아요 o
                await sequelize.transaction(async t => {
                    await db.post_like.findOne({
                        where: {
                            post_id: postId,
                            mem_id: memId,
                            // isLiked: true
                        },
                    }).then(async existingRecord => {
                        console.log('post_like UPDATE');
                        if (existingRecord) {
                            const result =  await existingRecord.update({
                                isLiked: likeClicked
                            },{transaction:t});
                            return result;
                        } else {
                            console.log('post_like CREATE');
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
                    //.then(result => {
                    //     console.log('레코드 업데이트 또는 생성 완료: ', result);
                    // })
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
                
                console.log("좋아요 설정 완료", isLiked);
                res.json({ success: true, message: '좋아요 성공적 처리', likeCount: likeCount, isLiked: isLiked });
                // this.showPost;  //⚠️⚠️
            } catch (err) {
                console.log("[좋아요 설정 오류] ", err.message);
                res.json({success:false});
                // res.redirect(`/board/post?no=${postId}&pageno=1&sort=earliest`);
            }
        }
        
    },
    getCommentInfo: async (req, res, next)=>{
        // console.log('[getCommentInfo] 도착');
        // console.log('[getCommentInfo] Checking data list -[getComment]', res.locals.dataList);
        
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log('[Error]: While setting commentInfo');
            // 에러 생기려나???
            next(err);
        }
        try {
            res.locals.commentInfo={};
            res.locals.commentInfo.pagination = res.locals.paginationInfo;
            res.locals.commentInfo.dataList = res.locals.dataList;
            res.locals.commentInfo.count = await db.post_comment.count({where:{post_id: req.query.no}});
            next();
            // obj.pathname = req.params.category? '/'+req.params.category: ''; // fetch 용인데,,음,,,
        } catch(err){
            // res.redirect('/');
            next(err);
        }
    },
    createComment: async (req, res, next) => {
        // console.log('[createComment] 도착');
        // console.log('[createComment] postId랑 content - /[newComment]', req.body.postId, req.body.content);
        // if문으로 postId, content 잇을때 조건 걸어야할까?
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
        // console.log('[showComment] test data(content):', req.body.content, '#comment: ', res.locals.commentInfo.count);
        const obj ={};
        obj.success =true;
        obj.page = res.locals.commentInfo.pagination.totalPage;
        console.log(obj.page);
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
    //현재 로그인한 사용자라면, 그 사용자의 좋아요 정보를 가져온다. 아니면 post - post-like 조인하든지. for문 2번씩돌려서 값 집어넣고.
    getMemberLike:()=>{},



}
