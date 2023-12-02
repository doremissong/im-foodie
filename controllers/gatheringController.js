const gathering = require('../models/gathering');
const {db, sequelize,} = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const participant = require('../models/participant');
// const { getPaginationInfo } = require('./middlewares');
const RECRUITING = 0;
const COMPLETED = 1;
const ISLEADER = 0;
// ISMEMBER = 1,
// ISAPPLYING 
// ISACCEPTED
// ISREFUSED

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
    showMainGatherPage: async (req, res)=>{
        //     showRecruitingPage,
        //     showCompletedPage, 호출
        const limit = 6;
        const obj = {};
        if(req.user){
            obj.user = req.user;
        }
        const recruitingList = await db.gathering.findAll({
            where:{state: RECRUITING},
            order:[['createdAt', 'DESC']],
            limit: limit,
        });

        const completedList = await db.gathering.findAll({
            where:{state: COMPLETED},
            order:[['createdAt', 'DESC']],
            limit: limit,
        });
        console.log(completedList =="");

        obj.recruitingList = recruitingList;
        obj.completedList = completedList;
        
        // res.render("gatherMain", obj);
        res.render("gather", obj);
    },

    showCreatePage: (req, res)=>{
        const obj ={};
        if(req.user){
            obj.user = req.user;
        }
        // res.render("createGather", obj);
        res.render("gatherCreate", obj);
    },

    showUpdatePage: (req, res)=>{
        const obj ={};
        if(req.user){
            obj.user = req.user;
        }
        res.render("gatherUpdate", obj);
    },

     // /gather/details?id=gathering_id 화면
    showGatheringDetail: async(req, res)=>{
        // 가져오기 정보.
        const gatheringId = req.query.id;
        const data = await db.gathering.findOne({
            where:{
                gathering_id: gatheringId,
            }
        });
        // first, send all info about gathering, gathering members(accepted), and if user is leader, then show buttons[edit] in the top 
        // and next to the member, there's also button [delete/]
        res.render("gatherShowDetail", {user:req.user, data: data});

    },

    
    showRecruitingList: async (req, res, next) => {
        // //searchGathering (state, gatherId, leaderId)
        // const list = await searchGathering(state = 0);
        // console.log('모집중인 그룹리스트 ', list);
        // if(list==""){
        //     res.render("mainGather", {user: req.user, dataList: list, msg: "아직 모집하고 있는 밥모임이 없네요!! 밥모임을 한번 만들어보시겠어요?"});
        //     // res.send("아직 모집하고 있는 밥모임이 없네요!! 밥모임을 한번 만들어보시겠어요?");
        // } else{
        //     // res.json(list);
        //     res.render("mainGather", {user: req.user, dataList: list});
        // }

        const obj = {};
        if(req.user){
            obj.user=req.user;
        }
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log('[ERROR] check pagination data.');
            // res.redirect(res.locals.history);
            res.redirect('/gather');
        }
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;
        res.render("gatherRecruiting", obj);
    },
    showCompletedList: async (req, res) => {
        const obj = {};
        if(req.user){
            obj.user=req.user;
        }
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log('[ERROR] check pagination data.');
            // res.redirect(res.locals.history);
            res.redirect('/gather');
        }
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;
        res.render("gatherCompleted", obj);
        // searchGathering (state, gatherId, leaderId)
        // const list = await searchGathering(state = 1);
        // console.log('모집완료된 그룹리스트 ', list);
        // if(list==""){
        //     // res.send("아직 모집 완료된 밥모임이 없네요!! 모집중인 밥모임을 구경해보시겠어요?");
        //     res.render("mainGather", {user: req.user, dataList: list, msg: "아직 모집 완료된 밥모임이 없네요!! 모집중인 밥모임을 구경해보시겠어요?"});
        // } else{
        //     // res.json(list);
        //     res.render("mainGather", {user: req.user, dataList: list});
        // }
        // // console.log('빈 데이터베이스 서칭 결과는 null일까? undefined일까/', typeof list);
        
    },
    showMyGatherList: async(req, res)=>{
        
    },
    /*💚가입한 목록, 만든 목록
        showJoinedPage: async (req, res) => {
            //participant ==>
            const memId = req.user.mem_id;
            // function searchParticipant(columns, id, state)
            console.time('쿼리 따로 따로');
            try {
                var partList = await db.participant.findAll({
                    attributes: ['gathering_id'],
                    where: {
                        mem_id: memId
                    }
                });
                partList = partList.map(i => i.dataValues); // 그러면 key 값이 없이 그냥 1,2만 나옴

                var gatherList = await db.gathering.findAll({
                    // attributes: ['gathering_id', 'leader_id'], // gathering 테이블의 열을 선택
                    where: { [Op.or]: partList }
                });
                // gatherList = list.map(i => i.dataValues);
                console.log(gatherList);
                // res.send(gatherList);

                res.render("iMadeGather", { user: req.user, dataList: gatherList });
                console.timeEnd('쿼리 따로 따로');
            } catch (err) {
                console.log(err);
            }
        },

        showIMadePage: async (req, res) => {
            const memId = req.user.mem_id;
            // searchGathering (state, gatherId, leaderId)
            const list = await searchGathering(undefined, undefined, memId);
            if (list == "") {
                res.render("mainGather", { user: req.user, dataList: list, msg: "직접 만든 밥모임이 아직 없네요? 방장이 되어보세요!" });
                // res.send("직접 만든 밥모임이 아직 없네요? 방장이 되어보세요!");
            } else {
                console.log('내가 만든 그룹리스트 ', list);
                // res.json(list);
                res.render("iMadeGather", { user: req.user, dataList: list });
            }

        },
        */

    // 팀장이 볼 때, 조원 어떻게 있는지 확인
    showMemberOfGathering: async (req, res) => {
        // 💚 query로 받음.
        const gatheringId = req.query.gatheringId;
        await db.participant.findAll({
            where: {
                gathering_id: gatheringId
            }
        })
            .then((members) => {
                res.json(members);
            })
            .catch((err) => { console.log(err, 'gatheringController-showMemberOfGathering') });

    },


    // 모임 신청 버튼
    // showGatherApplyPage: async (req, res)=>{
        
    //     const gatheringId = req.query.id;
    //     const data = await db.participant.findOne({
    //         where:{
    //             gathering_id: gatheringId,
    //         }
    //     });
    //     res.json(data);
    //     // res.render("gatherShowApply", {user:req.user, data: data});
    // },

    //✏️관리자용아님/ 접속회원용 / 그룹 목록 보여주고 선택하는 거잖아. 쿼리 하나로 둘다 할 수 잇어.
    // 1)state로 모집중인거 2) {mem_id: mem_id}만 where 조건 주면됨.
    // 근데 그냥 gathering 보여주면 되는 거 아니야? 굳이 participatn에서 뽑아낼 이유가 잇어?
    /* showGatheringList: async(req, res)=>{  //<---사용 안함
        // query 있으면 현재 모집중인 그룹.
        if (res.locals.paginationInfo && res.locals.dataList) {
            const paginationInfo = res.locals.paginationInfo;
            const dataList = res.locals.dataList;
            // const gatheringIdList = await db.gathering.findAll(  
            //     // {where:{}}
            // );
            // res.locals.gatheringId = gatheringIdList;
            res.render("mainGather", { user: req.user, dataList: dataList, pagination:paginationInfo });
        }
        // res.json(gatheringIdList);
       },
       */
    

    searchGather: (req, res)=>{
        // recipe 서치 참고. 아니면 공지사항 서치 참고
    },

    // ❤️ 모임 생성하기
    createGather: async(req,res)=>{
        //gather.ejs 확인
        //1) gathering 생성
        // 2) participant 추가
        if(!req.body){
            res.redirect("/gather/create");
        }
        // 왜 gatherData로 하면 안된느겨,,
        const gatherData = {
            // gathering_id: 
            name: req.body.name,
            leader_id: req.user.mem_id, //⚠️
            region: req.body.city + ' ' + req.body.district + ' ' + req.body.neighborhood,
            place: req.body.place,
            description: req.body.description,  ///⚠️
            deadline: req.body.deadline,
            state: RECRUITING,
            maximumHeadCount: req.body.number,//⚠️
            // image_url: 
            viewCount: 0,
        }
        console.log('[createGather] 전달받은 값 확인: ', req.body, 'gatherData 확인: ', gatherData);
        // var result = null;

        // // 모임 데이터 생성
        try{
            await sequelize.transaction(async t =>{
                result = await db.gathering.create({
                    // gathering_id: 
                    name: req.body.name,
                    leader_id: req.user.mem_id, //⚠️
                    region: req.body.district + ' ' + req.body.city + ' ' + req.body.neighborhood,
                    place: req.body.place,
                    description: req.body.description,  ///⚠️
                    deadline: req.body.deadline,
                    state: RECRUITING,
                    maximumHeadCount: req.body.number,//⚠️
                    // image_url: 
                    viewCount: 0,
                });
            })
            await sequelize.transaction(async t=>{
                await db.participant.create({
                    gathering_id: result.dataValues.gathering_id,
                    mem_id: req.user.mem_id,
                    message: '',
                    state: ISLEADER,
                    isConnected: 0,
                })
            })
            // res.redirect(`/gather/view?no=${result.dataValues.gathering_id}`);
            res.redirect('/gather');
        } catch(err){
            console.log(`Error creating gathering, participant:`, err);
            res.redirect("/gather/create");
        }
        // PARTICIPANT 참가자 데이터 생성
        try{
        } catch(err){
            // res.redirect("/gather/create");
        }
    },

    updateGather: async(req, res, next)=>{
        //gather.ejs 확인

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
    },

        // gathering, participant,apply 테이블 삭제
    deleteGather: async(req,res)=>{
        console.log('deleteGather 도착');
        // 역시나 req.body에 삭제할 그룹 id도 있어야함.
        if(!req.user){
            res.redirect('/gather');
            console.log('[Wrong Access] This user is not logged in');
        }

        if(!req.query.no){
            res.redirect('/gather');
            console.log('[Uncertain Information] There is no gathering number');
        }

        const memId = req.user.mem_id;
        const gatheringId = req.query.no;

        // 1) 모임 삭제 = 이건 cascade로 할까. 번거로우니까.
        //❤️❤️❤️❤️ 그룹 삭제될 때만 cascade??
        try{
            await sequelize.transaction(async t=>{
                await db.gathering.destroy({
                    where: {
                        leader_id: memId,
                        gathering_id: gatheringId
                    },
                    transaction: t
                })
            })
            res.send('delete success,,!');
        } catch(err){
            console.log(`Error deleting gathering: ${err}`);
            res.send('delete error');
        }
        // ON DELETE CASCADE로 했음!!!
        // //2) participant에서 해당 그룹 삭제
        // try{
        //     await sequelize.transaction(async t=>{
        //         await db.participant.destory({
        //             where: {
        //                 gathering_id: req.body.gatheirng_id
        //             }
        //         })
        //     })
        // } catch(err){
        //     console.log(`Error deleting participant related gathering: ${err}`);
        // }

        // // 3) 채팅 기록 삭제
        // try{
        //     await sequelize.transaction(async t=>{
        //         await db.chat.destory({
        //             where: {
        //                 gathering_id: req.body.gatheirng_id
        //             }
        //         })
        //     })
        // } catch(err){
        //     console.log(`Error deleting chat record related certain gathering: ${err}`);
        // }

    },
    // //멤버, 그룹에 신청하는건? 요청 어케 보내. 요청 또 담아야하는거얀???////////////ㄹㄹㄹ

    // 모임 
    applyForGather: async(req, res)=>{
        //⚠️⚠️⚠️try문 req.query 유효성 검사
        const gatheringId = req.query.id;

        // 이미 가입 신청했는지 확인.
        // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️applied 대신 checkMember 사용!!!!!
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

    // // ❤️❤️❤️❤️❤️update나 delete 시, 트리거 만들기!!!
    // // gathering 테이블에 currentHeadCount를 count(*) where gathering_id = 특정 아이디 일때
    // // 그렇게 하면 allow, banMEmber 할 때 일일이 변경 안해줘도 되지.
    // acceptMember: async(req, res)=>{
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


    // --------------------------------------------------------------------------
    // CHAT
    
    // 채팅 목록 보여주기
    
    showChatList: async(req, res) => {
        // 1. user가 속한 그룹 검색하고 가져오기.
        //필요한 값 - 일단은 다 가져오자. 내가 가입한 그룹
        const memId = req.user.mem_id;
        try{
            var partList = await db.participant.findAll({
                attributes: ['gathering_id'],
                where: {
                    mem_id: memId
                }
            });
            partList = partList.map(i=>i.dataValues); // 그러면 key 값이 없이 그냥 1,2만 나옴

            var gatherList = await db.gathering.findAll({
                // attributes: ['gathering_id', 'leader_id'], // gathering 테이블의 열을 선택
                where: {[Op.or]: partList}
            });
            // gatherList = list.map(i => i.dataValues);
            console.log(gatherList);
            // res.send(gatherList);
            
            // DATA가 DB에서 검색하고 없으면 NON -CHAT LIST 띄위ㅓ.
            res.render("chatList", {user: req.user, dataList: gatherList, msg: '가입한 밥모임이 없어요'});

        } catch(err){
            console.log(err);
        }

        // 2. gathering_id ==> roomId / gathering_name 을 보여주고, chatList.ejs에서 input태그의 value를 roomId(gathering_id)로 하기

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
        // res.locals.roomId = 3;
        res.locals.roomId = req.query.roomId;
        console.log('roomId: ', res.locals.roomId, 'mem_id: ', req.user.mem_id);
        isMember = await db.participant.findOne({
            attribute: ['mem_id'],
            where:{ gathering_id: res.locals.roomId, mem_id: req.user.mem_id}
        });
        // console.log('isMember- findOne한 결과값이 없으면 false가 나올까?, null 나옴.)',!isMember);
        
        if (!isMember) { res.redirect('/gather/chat/list'); }
        next();
    },

    test: async (req, res)=>{
        console.time('쿼리 한번에 하는 거');
        const user = req.query.user;
        // include 이용해서 조인 테스트
        try{
            const list = await db.gathering.findAll({
                attributes: ['gathering_id', 'leader_id'], // gathering 테이블의 열을 선택
                include: [{
                    model: db.participant,
                    attributes: ['gathering_id', 'mem_id'], // participants 테이블의 열을 선택
                    as: 'participants',
                    where: {
                        mem_id: user
                    },
                    required: true,
                    raw: true,  // dataValues만 보인다는데 효과x
                }]
            });
            gatherList = list.map(i => i.dataValues);
            console.log(gatherList);
            var partList = [];
            
            // 확인이 안됨. list.participants로는 
            for (child of gatherList){
                partList.push(child.participants.map(i=>i.dataValues));
            }
            console.log('참여자 확인: ', partList);
            // console.log('list: ', list);
            // console.log('join test: ', list[0].gathering_id);
            // const arr = list.map(i => i.gathering_id);
            // console.log(arr);
            res.send(list);
            console.timeEnd('쿼리 한번에 하는 거');
        } catch(err){
            console.log(err);
        }

    },
    test2: async(req, res)=>{
        console.time('쿼리 따로 따로');
        const user = req.query.user;
        try{
            var partList = await db.participant.findAll({
                attributes: ['gathering_id'],
                where: {
                    mem_id: user
                }
            });
            partList = partList.map(i=>i.dataValues); // 그러면 key 값이 없이 그냥 1,2만 나옴

            console.log('타입; ', partList);

            var gatherList = await db.gathering.findAll({
                attributes: ['gathering_id', 'leader_id'], // gathering 테이블의 열을 선택
                where: {[Op.or]: partList}
            });
            // gatherList = list.map(i => i.dataValues);
            console.log(gatherList);
            res.send(gatherList);
            console.timeEnd('쿼리 따로 따로');
        } catch(err){
            console.log(err);
        }


        // const posts = await db.post.findAll({
        //     // where,
        //     limit: 10,
        //     include: [{
        //       model: db.post_image, // 게시글의 이미지
        //       as: 'post_images'
        //     }, {
        //       model: db.post_comment, // 게시글의 댓글
        //     //   include: [{
        //     //     model: db.member, //댓글을 쓴 사람
        //     //     attributes: ['mem_id', 'name'],
                
        //     //   }],
        //       as: 'post_comments',
        //     }, {
        //       model: db.post_like, // 좋아요 누른 사람
        //       as: 'post_likes',
        //       attributes: ['mem_id'],
        //     }],
        //     order: [
        //       ['createdAt', 'DESC'],
        //       ['post_comments', 'createdAt', 'DESC']
        //     ],
        //   });
        //   const dataList = posts.map(i=>i.dataValues);
        //   var nestedList =[];
        //   for (child of dataList){
        //     nestedList = child.post_comments.map(i=>i.dataValues);            
        //   }
        //   console.log(nestedList);

        //   console.log(dataList);
        //   res.send(dataList);
    },

}