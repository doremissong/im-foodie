const { isUndefined } = require('util');
const { db, sequelize } = require('../models/index');
const path = require('path');
const { countReset } = require('console');

// paging info 빼는 함수 만들고
// paging 할 데이터 뺀느 함수.

// getBoardParams = (info, modify) => {
//     if (!modify) {   //생성
//         return {
//             name = info.name,
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

getPostParams = (info, modify, reqMemId)=>{
    // 작성자 추출. req.session.user? 아니면 req.user에서 id 가져와야하ㅁ.
    if(!modify){    // 생성
        return {
            category: info.category, //어디서 가져오지?
            writer_id: reqMemId,
            title: info.title,
            content: info.content,
            count: 0,
            state: 0, //생성
            img_flag: 0
        }
    } else{
        return {
            modify:'modify'
        }
    }
}

module.exports = {
    showPage: async(req, res)=>{
        // 카테고리
        const paginationInfo = res.locals.paginationInfo;
        const dataList = res.locals.dataList;
        console.log('확인한다. res.locals.model', res.locals.model);    // setDBModel(post); ==> post나온다. 
        
        //success:true는 왜 한거지? 
        console.log({paginationInfo: paginationInfo});
        // console.log({paginationInfo: paginationInfo, postList: postList});
        res.render('board',{pagination:paginationInfo, dataList: dataList});
        // res.json({paginationInfo: paginationInfo, postList: postList});

    },
    testShowBoard: async(req, res)=>{
        //1. 게시판 종류 확인하고 보여주기 1) 전체 2)
        // 유저가 로그인 상태인지 아닌지 확인. <-- 글 작성, 댓글, 좋아요 할 때 체크. 안했으면 팝업창 띄우기
        try{
            console.log("Loading ", req.user.mem_id);
            res.locals.boards = await db.post.findAll();
            if(req.user.mem_id)
                console.log("게시판 유저 확인 :", req.user.mem_id);
            res.json(res.locals.boards);
            // next();
        } catch (err){
            console.log(`Error fetching board by ID: ${err.message}`);
            // next(err);
        }
    },
    showPost: async(req, res)=>{
        const postId = req.query.postid;
        //❤️ 조회수 카운팅
        // 조회수 viewCount로 하고 db만 따로 설정해주고, postId는 쿼리로 받으면 된다.
        await db.post.update({viewCount: sequelize.literal('viewCount + 1')}, {
            where: {post_id: postId}
        })
        .catch((err)=>{console.log(`Error: while updating view count. ${err.message}`)});
        
        
        try{
            console.log("Loading");
            post = await db.post.findAll({
                where: {post_id: postId}
            });
            // res.json(post);
            res.sendFile(path.join(__dirname, "../public/html/board.html"));
            // next();
        } catch (err){
            console.log(`Error fetching post by ID: ${err.message}`);
            // next(err);
        }
    },
    writePost: async(req, res)=>{
        var postData = getPostParams(req.body, 0, req.user.mem_id);
        console.log('test', postData);
        // res.json(postData);
        try {
            await sequelize.transaction(async t => {
                    await db.post.create(postData, { transaction: t });
                    res.locals.redirect = "/";
                    res.redirect("/board");
            })
        } catch (err) {
            console.log(`Error saving post: ${err.message}`);
            console.log(err);
            res.redirect("/board");
        }
    },

    update:()=>{

    },
    // updateView

    delete:()=>{

    },
// CRUD 끝날 때마다 res.status(200).send(user);
    


}
