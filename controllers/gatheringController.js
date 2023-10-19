const {db, sequelize} = require('../models/index');

// 기본값 == undefined. 그러면 내가 해줄 필요없어.
async function searchGathering (state, gatherId, leaderId) { // gathering_id, 
    var condition={};
    if(typeof state !== "undefined"){
        condition.state = state;
    }
    if(typeof gatherId !== "undefined"){
        condition.gathering_id = gatherId;
    }
    if(typeof leaderId !== "undefined"){
        condition.leader_id = leaderId;
    }
    const list = await db.gathering.findAll({
        where:condition
    })  
    return list;
};

// column형식은 ['name', 'mem_id'];
async function searchParticipant(columns, memId, state) {
    var whereCondition = {};
    if(typeof memId != "undefined"){
        whereCondition.mem_id = memId;
    }
    if(typeof state != "undefined"){
        whereCondition.state = state;
    }

    //columns 는 필요한 컬럼 object 가입한 목록은,
    // ❓근데 gathering_id 다 뽑았어. 그거가지고 condition에 where {}에 몽땅 집어넣어도 괜찮아/??응 괜찮아
    var conditions = {
        attributes: columns,
        where: whereCondition
    };
    const list = await db.participant.findAll(conditions);
    return list;
};

// 얘네 호출 전에는 isLoggedIn 확인
module.exports={
    
    showRecruitingPage: async (req, res) => {
        //searchGathering (state, gatherId, leaderId)
        const list = await searchGathering(state = 0);
        console.log('모집중인 그룹리스트 ', list);
        if(list==""){
            res.render("mainGather", {user: req.user, dataList: list, msg: "아직 모집하고 있는 밥모임이 없네요!! 밥모임을 한번 만들어보시겠어요?"});
            // res.send("아직 모집하고 있는 밥모임이 없네요!! 밥모임을 한번 만들어보시겠어요?");
        } else{
            // res.json(list);
            res.render("mainGather", {user: req.user, dataList: list});
        }
    },
    showCompletedPage: async (req, res) => {
        // searchGathering (state, gatherId, leaderId)
        const list = await searchGathering(state = 1);
        console.log('모집완료된 그룹리스트 ', list);
        if(list==""){
            // res.send("아직 모집 완료된 밥모임이 없네요!! 모집중인 밥모임을 구경해보시겠어요?");
            res.render("mainGather", {user: req.user, dataList: list, msg: "아직 모집 완료된 밥모임이 없네요!! 모집중인 밥모임을 구경해보시겠어요?"});
        } else{
            // res.json(list);
            res.render("mainGather", {user: req.user, dataList: list});
        }
        // console.log('빈 데이터베이스 서칭 결과는 null일까? undefined일까/', typeof list);
        
    },
    // 💚
    showJoinedPage: async (req, res) => {
        //participant ==>
        const memId = req.user.mem_id;
        // function searchParticipant(columns, id, state)
        const list = await searchParticipant(['gathering_id'], memId, undefined);
        var info = [];
        var temp;
        // list.foreach(async (data)=>{
        //     temp = await db.gathering.findOne({
        //         where:{
        //             gathering_id: data.gathering_id
        //         }
        //     })
        //     info.push(temp);
        // });
        console.log('배고파, 이렇게 일일이 넣어야하나요? 왜안되나요 타입이 뭔뎅?',typeof list);
        // var info = await db.gathering.findAll({
        //     where: list
        // });
        // console.log(info);
        console.log('지원/가입한 그룹리스트 ', list.gathering_id);
        res.json(list);
    },
    showIMadePage: async (req, res) => {
        const memId = req.user.mem_id;
        // searchGathering (state, gatherId, leaderId)
        const list = await searchGathering(undefined, undefined, memId);
        if(list == ""){
            res.render("mainGather", {user: req.user, dataList: list, msg: "직접 만든 밥모임이 아직 없네요? 방장이 되어보세요!"});
            // res.send("직접 만든 밥모임이 아직 없네요? 방장이 되어보세요!");
        } else{
            console.log('내가 만든 그룹리스트 ', list);
            // res.json(list);
            res.render("iMadeGather", {user: req.user, dataList: list});
        }

    },

    // 채팅 목록 보여주기
    showChatList: async(req, res) => {
        //필요한 값 - 일단은 다 가져오자. 내가 가입한 그룹
        const list = await searchGathering();
        // 1. user가 속한 그룹 검색하고 가져오기.
        /*
        await db.participant.findAll({
            where: {mem_id: req.user.mem_id}
        }).then((gatherings)=>{
            그룹id로 gathering 검색해.
            검색한 데이터를 chatList에 전달.(joinedGatherings: gathering.name, gathering.id(roomId가 될아이), leader.id 전달.)
        })
        .catch((err)=>{

        })
        */
        // 2. gathering_id ==> roomId / gathering_name 을 보여주고, chatList.ejs에서 input태그의 value를 roomId(gathering_id)로 하기

        // DATA가 DB에서 검색하고 없으면 NON -CHAT LIST 띄위ㅓ.
        res.render("chatList", {user: req.user, dataList: list});
    },

    // 3. 그룹선택
    selectRoom: (req, res)=>{
        
        console.log('DELETE: userID ',req.user.mem_id);
        res.locals.roomId = req.query.roomId; //res // 선택한 그룹채팅방 id 가져오기.
        console.log('DELETE: RoomId ',res.locals.roomId, '가 GET방식으로 전달 받은 값이다.- gController-selectRoom');
        res.locals.name = req.query.name;
        console.log('DELETE: name ',res.locals.name, '가 GET방식으로 전달 받은 값이다.- gController-selectRoom');
        // ❓❤️❤️❤️ user 넘기지 말고 이름만 넘겨?  id랑?귀찮다..
        res.render("chat", {user: req.user, roomId: res.locals.roomId, gatherName: res.locals.name});
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


    //✏️관리자용아님/ 접속회원용 / 그룹 목록 보여주고 선택하는 거잖아. 쿼리 하나로 둘다 할 수 잇어.
    // 1)state로 모집중인거 2) {mem_id: mem_id}만 where 조건 주면됨.
    // 근데 그냥 gathering 보여주면 되는 거 아니야? 굳이 participatn에서 뽑아낼 이유가 잇어?
    showGatheringList: async(req, res)=>{
        // query 있으면 현재 모집중인 그룹.
        const gatheringIdList = await db.gathering.findAll(
            // {where:{}}
            );
        res.locals.gatheringId = gatheringIdList;
        // res.json(gatheringIdList);
        res.render("mainGather", {user: req.user, dataList: gatheringIdList});
    },

    // // 접속회원용
    // showMyGatheringList: async(req, res)=>{     //참가자 목록에서 찾아서 목록을 찾는 거지.
    //     // 흠,, 전체 말고 특정 회원 알고싶으면.
    //     const gatheringIDList = await db.participant.findAll({
    //         where: {mem_id: req.user.mem_id} //id 멤버가 가입된 모임 아이디 찾아
    //     });
    //     res.json(gatheringIDList);
    // },

    // 팀장이 볼 때, 조원 어떻게 있는지 확인
    showMemberOfGathering: async(req, res)=>{
        // 💚 query로 받음.
        const gatheringId = req.query.gatheringId;
        await db.participant.findAll({
            where: {
                gathering_id: gatheringId
            }
        })
        .then((members)=>{
            res.json(members);
        })
        .catch((err)=>{console.log(err, 'gatheringController-showMemberOfGathering')});

    },

    showGatherApplyPage: async (req, res)=>{
        
        const gatheringId = req.query.id;
        const data = await db.participant.findOne({
            where:{
                gathering_id: gatheringId,
            }
        });
        res.json(data);
        // res.render("showGatherApply", {user:req.user, data: data});
    },

    applyForGathering: async(req, res)=>{
        // 이미 가입 신청했는지 확인.
        const gatheringId = req.query.id;
        const applied = await db.participant.findOne({
            where:{
                gathering_id: gatheringId,
                mem_id: req.user.mem_id
            }
        })
        
        if(!applied){
            try{
                await sequelize.transaction(async t => {
                    await db.participant.create({
                        gathering_id: 1,
                        mem_id: req.user.mem_id,
                        message: '공릉동 맛집 뽀시고 싶어요!!'
                    }, { transaction: t});
                });
                const test = await db.participant.findAll();
                res.send(test);
                // res.redirect("/gather");
            } catch(err){
                console.log(`Error applying for Gathering ${err.message}`);
                res.send(err.message);
                // res.redirect("/gather")
            }
        } else{
            console.log("이미 신청완료되었습니다.");
            res.redirect("/gather/create");
        }

        
    },
    //자세히
    showGatheringDetail: async(req, res)=>{
        // 가져오기 정보.
        const gatheringId = req.query.id;
        const data = await db.gathering.findOne({
            where:{
                gathering_id: gatheringId,
            }
        });

        res.render("showGatherDetail", {user:req.user, data: data});

    },
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

    showMainGatherPage: (req, res)=>{
        res.send()
    },
    showCreatePage: (req, res)=>{
        res.render("createGather", {user: req.user});
    }
    // ❤️ 모임 생성하기
    // createGather: async(req,res, next)=>{
        // 전달 받을 것 : name=모임이름, leader_id = req.user, region= , place=, description:, headCount, image_url,
        // 얘네는 내가 할 수 있음 create_date, update_date
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