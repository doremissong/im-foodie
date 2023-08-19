const { db, sequelize } = require('../models/index');

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

// getPostParams = async (info, modify)=>{
//     // 작성자는 알아서 추출해야해.
//     req.session.user? 아니면 req.user에서 id 가져와야하ㅁ.
//     const writer = await db.member.findOne({where:{mem_id:info.mem_id}});
//     if(!modify){
//         return {
//             board_id = info.board_id, //어디서 가져오지?
//             writer_sq = writer.mem_sq,
//             title = info.title,
//             content = info.content,
//             count = 0,
//             state = 0, //생성
//             create_date = Date.now(),
//             update_date = Date.now(),
//             img_flag = info.img_flag
//         }
//     } else{
//         return {
//             board_id = info.board_id, //어디서 가져오지?
//             writer_sq = writer.mem_sq,
//             title = info.title,
//             content = info.content,
//             count = info.count,
//             state = 1, //수정
//             create_date = info.create_date,
//             update_date = Date.now(),
//             img_flag = info.img_flag
//         }
//     }
// }

module.exports = {
    showBoard: async(req, res)=>{
        try{
            console.log("Loading");
            res.locals.boards = await db.board.findAll();
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
            // post = await db.post.findOne({where:{post_id: 받아온:post_id}});
            // res.json(post);
            //res.sendFile()
            // next();
        } catch (err){
            console.log(`Error fetching post by ID: ${err.message}`);
            // next(err);
        }
    },

    createBoard:async(req, res, next)=>{
        const info = req.body;
        await db.board.create

    },

    update:()=>{

    },
    // updateView

    delete:()=>{

    },
// CRUD 끝날 때마다 res.status(200).send(user);
    


}