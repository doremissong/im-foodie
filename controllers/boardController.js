const { db, sequelize } = require('../models/index');
const path = require('path');

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
    showFirstPage:(req, res)=>{
        res.redirect("/board/" + 1);
    },
    showBoard: async (req, res) => {
        var page_size = 20; // 페이지 당 게시물 수
        var page_set_size = 10; // #pages
        var post_offset = 0;    //❓limit 변수. mysql query 검색할 때 몇개까지 검색할지.
        var totalPageCount = 0;
        var totalPostCount = 0;

        // db에서 게시판 글 가져오기 writer, 글 가져오기,
        try {
            totalPostCount = await db.post.count();
        }
        catch (err) {
            console.log(`ERROR while checking # pages. ${err}`);
        }
        // 전체 게시글 수 확인
        if (totalPostCount < 0) {
            totalPostCount = 0;
        }

        totalPageCount = Math.ceil(totalPostCount / page_size);   // 전체 페이지수
        const curPage = req.params.page;
        // curPage의 값이 유효한지 체크 curPage<0 || curPage>totalPageCount이면 curPage=1로 해보려.
        if (curPage < 0 || curPage > totalPageCount) {
            curPage = 1;
        }
        var totalSet = Math.ceil(totalPageCount / page_set_size);    // 10쪽 단위로 몇개있는지. 전체 쪽수를 1~10 단위로 보여주니까.
        var curSet = Math.ceil(curPage / page_set_size);   // 현재 페이지의 세트 번호
        var startPage = ((curSet - 1) * 10) + 1;    // 보여질 set의 첫번째 쪽
        var endPage = (startPage + page_set_size) - 1;

        post_offset = (curPage - 1) * 10; // DB는 0부터 시작.
        console.log("확인한다. 파라미터 값 가져오는지, 지금 페이지랑 offset: ", req.params.page, curPage, post_offset);
        // var postList = await db.post.findAll({
        //     // attributes: ['post_id', 'category', 'title', 'writer_id', 'createdAt', 'count'], // 게시판 종류, 제목, 글쓴이, 작성일, 조회수
        //     order: [["createdAt", "DESC"]],
        //     offset: post_offset, limit: page_size
        // });
        // console.log("보여줄 게시글 보여주기\n", postList);

        // var paging_info = {
        //     "curPage": curPage,
        //     "page_set_size": page_set_size,
        //     "totalPageCount": totalPageCount,
        //     "totalSet": totalSet,
        //     "curSet": curSet,
        //     "startPage": startPage,
        //     "endPage": endPage
        // }

        // res.json(paging_info);
        // res.render("testBoard", {
        //     data: postList,
        //     paging: paging_info
        // });
        res.sendFile(path.join(__dirname, "../public/html/board.html"));
        
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
        // :post_id를 받아와야해.
        try{
            console.log("Loading");
            post = await db.post.findAll();
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