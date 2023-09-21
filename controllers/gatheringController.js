const {db, sequelize} = require('../models/index');

// 얘네 호출 전에는 isLoggedIn 확인
module.exports={
    showChatList: (req, res) => {
        // 그룹 선택.
        res.render("chatList");
    },

    selectRoom: (req, res)=>{
        console.log(req.body.roomId, '가 post로 전달 받은 값이다.');
        res.locals.roomId = req.body.roomId; //res
        res.render("chat", {currentUser: req.user.mem_id, roomId: res.locals.roomId});
        // res.redirect("/chat/room");
        // roomId값을 어케 전달하누
    },
    checkMember: async(req, res, next)=>{
        res.locals.roomId = req.body.roomId;
        console.log('roomId: ', res.locals.roomId, 'mem_id: ', req.user.mem_id);
        isMember = await db.participant.findOne({
            where:{ gathering_id: res.locals.roomId, mem_id: req.user.mem_id}
        });
        console.log(isMember);
        if (!isMember) { res.redirect('/chat/list'); }
        next();
    },

    //✏️관리자용, 근데 그냥 gathering 보여주면 되는 거 아니야? 굳이 participatn에서 뽑아낼 이유가 잇어?
    // showAllGatheringList: async(req, res)=>{
    //     const gatheringIDList = await db.participant.findAll();
    //     res.locals.gatheringID = gatheringIDList;
    //     res.json(gatheringIDList);
    // },

    // // 접속회원용
    // showGatheringIDList: async(req, res)=>{     //참가자 목록에서 찾아서 목록을 찾는 거지.
    //     // 흠,, 전체 말고 특정 회원 알고싶으면.
    //     const gatheringIDList = await db.participant.findAll({
    //         where: {mem_id: req.user.mem_id} //id 멤버가 가입된 모임 아이디 찾아
    //     });
    //     res.json(gatheringIDList);
    // },

    // // getGatheringInformation(이건 방장용?)이랑 겹쳐... 이건 일반 멤버용?
    // // getRooms
    // showGatheringList: async (req, res) => {
    //     try {
    //         const gatheringList = await db.gathering.findOne({
    //             where: {     // 모든 모임 보여주는 것 + 특정 모임 보여주는 것 어케하지?
    //                 gathering_id: req.body.gathering_id? req.body.gathering_id : 1=1    //1=1이거 sql이랑 같이 되나?
    //             }
    //         });
    //         res.json(gatheringList);
    //     }
    //     catch (err) {
    //         console.log(`Error loading gatheringList: ${err}`);
    //     }
    // },

    // // 모임 생성하기
    // createGathering: async(req,res, next)=>{
    //     // 전달 받을 것 : name=모임이름, leader_id = req.user, region= , place=, description:, headCount, image_url,
    //     // 얘네는 내가 할 수 있음 create_date, update_date
    //     try{
    //         await sequelize.transaction(async t =>{
    //             await db.gathering.create({ //전달받은 거
    //                 name:'모임이름', leader_id : req.body.leader_id, region:req.body.region+'어딘기' ,
    //                 place:req.body.place+'미정', description:req.body.description+'와 맛있겠다', headCount:req.body.headCount, image_url:req.body.image_url
    //                 //create_date = , update_date 어딘ㄷ가 알서,,,
    //             })
    //         })
    //         next();
    //     } catch(err){
    //         console.log(`Error creating gathering: ${err}`);
    //         next(err);
    //     }
    // },

    //     // 수정용 / 특정한 모임 정보 받으려면 1) 이름 필요해. 
    // getGatheringInformation: async(req,res,next)=>{
    //     // 그룹 id도 건네 받아야함.
    //     const info = await db.gathering.findOne({
    //         where:{
    //             gathering_id: req.body.gatheirng_id,
    //             leader_id: req.user.mem_id
    //         }
    //     });
    //     res.locals.gatheringInfo = info;
    //     res.json(info); //클라이언트에 어케 주지.
    // },

    // updateGatheringInformation: async(req, res, next)=>{
    //     const data = { //💚전달받은 거
    //         name:'모임이름', leader_id : req.body.leader_id, region:req.body.region+'어딘기' ,
    //         place:req.body.place+'미정', description:req.body.description+'와 맛있겠다', headCount:req.body.headCount, image_url:req.body.image_url
    //         //create_date = , update_date 어딘ㄷ가 알서,,,
    //     };
    //     try {
    //         await sequelize.transaction(async t => {
    //             await db.gathering.update(data,{
    //                 where: {
    //                     leader_id: req.user.mem_id,
    //                 },
    //                 transaction: t
    //             })
    //         });
    //         next();
    //     } catch (err) {
    //         console.log(`Error updating gathering information: ${err}`);
    //         next(err);
    //     }
    // },

    // deleteGathering: async(req,res)=>{
    //     // 역시나 req.body에 삭제할 그룹 id도 있어야함.
    //     // 1) 모임 삭제 = 이건 cascade로 할까. 번거로우니까.
    //     //❤️❤️❤️❤️ 그룹 삭제될 때만 cascade??
    //     try{
    //         await sequelize.transaction(async t=>{
    //             await db.gathering.destory({
    //                 where: {
    //                     leader_id: req.user.mem_id,
    //                     gathering_id: req.body.gatheirng_id
    //                 }
    //             })
    //         })
    //     } catch(err){
    //         console.log(`Error deleting gathering: ${err}`);
    //     }
    //     //2) participant에서 해당 그룹 삭제
    //     try{
    //         await sequelize.transaction(async t=>{
    //             await db.participant.destory({
    //                 where: {
    //                     gathering_id: req.body.gatheirng_id
    //                 }
    //             })
    //         })
    //     } catch(err){
    //         console.log(`Error deleting participant related gathering: ${err}`);
    //     }

    //     // 3) 채팅 기록 삭제
    //     try{
    //         await sequelize.transaction(async t=>{
    //             await db.chat.destory({
    //                 where: {
    //                     gathering_id: req.body.gatheirng_id
    //                 }
    //             })
    //         })
    //     } catch(err){
    //         console.log(`Error deleting chat record related certain gathering: ${err}`);
    //     }

    // },
    // //멤버, 그룹에 신청하는건? 요청 어케 보내. 요청 또 담아야하는거얀???////////////ㄹㄹㄹㄹ


    // // ❤️❤️❤️❤️❤️update나 delete 시, 트리거 만들기!!!
    // // gathering 테이블에 currentHeadCount를 count(*) where gathering_id = 특정 아이디 일때
    // // 그렇게 하면 allow, banMEmber 할 때 일일이 변경 안해줘도 되지.
    // allowMember: async(req, res)=>{
    //     try{
    //         await sequelize.transaction(async t=>{
    //             await db.participant.create({
    //                 gatheirng_id: req.body.gatheirng_id,
    //                 mem_id: req.body.mem_id,
    //                 join_date: sequelize.literal(`NOW()`),
    //                 //isConnected: 0이 디폴트
    //             })
    //         })
    //     } catch(err){
    //         console.log(`Error saving new gathering member: ${err}`);
    //     }
    // },

    // banMember: async(req, res)=>{
    //     try{
    //         await sequelize.transaction(async t=>{
    //             await db.participant.destory({
    //                 where: {
    //                     leader_id: req.body.mem_id,
    //                     gathering_id: req.body.gatheirng_id
    //                 }
    //             })
    //         })
    //     } catch(err){
    //         console.log(`Error deleting gathering member: ${err}`);
    //     }
    // },


    

    // 방장 나갔을 때,,,,
    // 1) participant에서 방장 삭제.
    //participant에 gatheringId로 findOne(attributes: mem_id) 그사람을 방장으로 바꾸자.
    // newLeader: async(req, res)=>{
    //     ///*❤️*/ 기존 방장 id, 새 방장id, 모임 id도 req.body에 있어야해
    //     const newLeader_id = await db.participant.findOne({
    //         attributes: ['mem_id'],
    //         where: {gatheirng_id:req.body.gatheirng_id}
    //     });
    //     try{
    //         await sequelize.transaction(async t=>{
    //             await db.gathering.update({leader_id: newLeader_id},{ 
    //                 where: {
    //                     leader_id: req.user.oldLeader_id,/*❤️*/
    //                     gathering_id: req.body.gatheirng_id
    //                 }
    //             })
    //         })
    //     } catch(err){
    //         console.log(`Error enrolling new leader of gathering: ${err}`);
    //     }
    // }

}