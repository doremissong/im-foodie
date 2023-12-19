const gathering = require('../models/gathering');
const {db, sequelize,} = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const participant = require('../models/participant');
// const { getPaginationInfo } = require('./middlewares');
const RECRUITING = 0, COMPLETED = 1;
const ISCREATING = 0, ISMODIFYING = 1;
const ISLEADER = 0, ISMEMBER = 1, ISAPPLYING = 2, ISREFUSED = 3, ISNOTMEMBER =4;
// ISACCEPTED

getGatherParams = (info, isModifying, _memId)=>{
    // 작성자 추출. req.session.user? 아니면 req.user에서 id 가져와야하ㅁ.
    var result = {};
    if(!isModifying){    // 생성
        result =  {
            name: info.name,
            leader_id: _memId,
            city: info.city,
            district: info.district,
            neighborhood: info.neighborhood,
            place: info.place,
            description: info.description,
            deadline: info.deadline,
            state: RECRUITING,
            maximumHeadCount: info.number,
            //image_url: 
            viewCount: 0,
        }
    } else{
        result = {
            name: info.name,
            city: info.city,
            district: info.district,
            neighborhood: info.neighborhood,
            place: info.place,
            description: info.description,
            deadline: info.deadline,
            state: (info.deadline > new Date())? RECRUITING: COMPLETED,
            // state 테스트 필요.
            maximumHeadCount: info.number,
            //image_url: 
        }
    }
    return result;
}
// 기본값 == undefined. 그러면 내가 해줄 필요없어.
// 맨뒤 condition 만들어줘
searchGathering = async (_cols, _state, _gatherId, _leaderId, _condition) => { // gathering_id, 
    var condition={};
    var where = {};
    if (typeof _state !== "undefined") where.state = _state;
    if (typeof _gatherId !== "undefined") where.gathering_id = _gatherId
    if (typeof _leaderId !== "undefined") where.leader_id = _leaderId;
    if (typeof _condition !== "undefined"){
        condition = _condition;
    } else {
        condition = {
            attributes: _cols,
            where,
            raw: true
        };
    }
    const list = await db.gathering.findOne(condition);
    console.log('[searchGathering]',condition);
    // console.log('밥모임 검색 결과: ',list);
    return list;
};
// console.log('안녕');
// searchGathering(undefined, undefined, undefined, undefined, {where:{leader_id: 'black'},  raw:true});
// searchGathering(undefined, undefined, undefined, 'black');
// 기본값 == undefined. 그러면 내가 해줄 필요없어.
searchGatherings = async (_cols, _state, _gatherId, _leaderId, _condition) => { // gathering_id, 
    var condition={};
    var where = {};
    if (typeof _state !== "undefined") where.state = _state;
    if (typeof _gatherId !== "undefined") where.gathering_id = _gatherId
    if (typeof _leaderId !== "undefined") where.leader_id = _leaderId;
    if (typeof _condition !== "undefined"){
        condition = _condition;
    } else {
        condition = {
            attributes: _cols,
            where,
            raw: true
        };
    }
    const list = await db.gathering.findAll(condition);
    // console.log('밥모임 검색 결과: ',list);
    return list;
};
// column형식은 ['name', 'mem_id'];
searchParticipant = async (_cols, _state, _gatherId, _memId, _condition)=> {
    var condition = {};
    var where = {};
    if (typeof _memId != "undefined") where.mem_id = _memId;
    if (typeof _state != "undefined") where.state = _state;
    if (typeof _gatherId != "undefined") where.gathering_id = _gatherId;
    if (typeof _condition !== "undefined"){
        condition = _condition;
    } else {
        condition = {
            attributes: _cols,
            where,
            raw: true
        };
    }
    const list = await db.participant.findOne(condition);

    console.log('[searchParticipants] conditon: ', condition);
    console.log('[searchParticipant] where: ', where);
    //columns 는 필요한 컬럼 object 가입한 목록은,
    console.log('[searchParticipant] _cols: ', _cols);
    console.log('[searchParticipant] result:', list);
    return list;
};
// searchParticipant(['state', 'gathering_id', 'mem_id'], undefined, 1, '');
            
// column형식은 ['name', 'mem_id'];
searchParticipants = async (_cols, _state, _gatherId, _memId, _condition)=> {
    var condition = {};
    var where = {};
    if (typeof _memId != "undefined") where.mem_id = _memId;
    if (typeof _state != "undefined") where.state = _state;
    if (typeof _gatherId != "undefined") where.gathering_id = _gatherId;
    if (typeof _condition !== "undefined"){
        condition = _condition;
    } else {
        condition = {
            attributes: _cols,
            where,
            raw: true
        };
    }
    const list = await db.participant.findAll(condition);
    console.log('[searchParticipants] conditon: ', condition);
    //columns 는 필요한 컬럼 object 가입한 목록은,
    console.log('[searchParticipants] _cols: ', _cols);
    //columns 는 필요한 컬럼 object 가입한 목록은,
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
        const recruitingList = await searchGatherings(undefined, undefined, undefined, undefined, {
            where: { state: RECRUITING },
            order: [['createdAt', 'DESC']],
            limit: limit,
            raw: true,
        });
        console.log('recruiting list result:', recruitingList);

        const completedList = await searchGatherings(undefined, undefined, undefined, undefined, {
            where: { state: COMPLETED },
            order: [['createdAt', 'DESC']],
            limit: limit,
        });
        console.log('모집완료 글 없나?', completedList =="");

        obj.recruitingList = recruitingList;
        obj.completedList = completedList;
        
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

    showUpdatePage: async (req, res)=>{
        const obj ={};

        if(!req.user){
            console.log('[ERROR] This user is not logged in');
            res.redirect("/gather");
        }
        obj.user = req.user;
        if(!req.query.no){
            console.log('[ERROR] There is no gathering number');
            res.redirect("/gather");
        }
        const _gatherId = req.query.no;

        try{
            const temp = await searchGathering(undefined, undefined, _gatherId);
            // await db.gathering.findOne({
            //     where: { gathering_id: _gatherId },
            //     raw: true
            // });
            if(temp==null){
                throw error;
            }
            obj.data = temp;
            console.log('🐰query value: ', temp);

        } catch(err){
            console.log(`[Error] cannot get gathering data from DB - showUpdatePage.- gather`, err);
            // res.redirect('/recipe');
            res.send(err);
        }
        res.render("gatherUpdate", obj);
    },

     // /gather/view?id나 no=gathering_id 화면
    showGatheringDetail: async(req, res)=>{
        // 가져오기 정보.
        const obj = {};
        // 유효성
        if(req.user){
            obj.user = req.user;
        }
        const _memId = req.user? req.user.mem_id : '';   //undefined하면 who가 0이됨
// 'fuck';
        if(!req.query.no){
            console.log('There is no number of gather');
            res.redirect('/gather')
        }
        const _gatherId = req.query.no;

        // 모임 정보 가져가기
        try {
            //  (_cols, _state, _gatherId, _leaderId) 
            var data = await searchGathering(undefined, undefined, _gatherId, undefined);
            if (!data || data.length == 0) { // 검색어 없으면 
                console.log('[ERROR] WRONG ACCESS');
                res.redirect('/gather');
            }
            obj.gatherData = data;
            // console.log('obj test:', obj);
        } catch(err){
            console.log('[ERROR] While getting data on gathering from DB ', err);
            res.redirect('/gather');
            // res.send(err);
        }
        try {
            // memId, _gatherId, state 가져와서, _gatherId가 맞는지 비교?// console.log('1st-----------');
            // var who = await searchParticipant(undefined, undefined, undefined, undefined, {
            //     attributes: ['state', 'gathering_id', 'mem_id'],
            //     where:{
            //         mem_id: _memId,
            //         gathering_id: _gatherId
            //     },
            //     raw: true
            // });
            // console.log('2nd-------------');
            var who = await searchParticipant(['state', 'gathering_id', 'mem_id'], undefined, _gatherId, _memId);
            if(!who || who.length ==0 || typeof who == 'undefined'){
                who = ISNOTMEMBER;
            } else{
                who = who.state;
            }
            obj.who = who;
            console.log('who:', who);
            switch(who){
                case ISLEADER:  
                console.log('switch');
                    // console.log('switch동작');
                    // 해당 모임의 가입신청한 유저 목록 저장
                    obj.applicantList = await searchParticipants(undefined, ISAPPLYING, _gatherId, undefined);
                case ISMEMBER:
                    console.log('switch');
                    // 모임원 목록
                    obj.gatherMemberList = await searchParticipants(undefined, [ISLEADER, ISMEMBER], _gatherId, undefined);
                    break;
                case ISAPPLYING:
                    //⚠️지원자는 버튼 클릭하면 이미 신청했어요!
                    // break;
                case ISREFUSED:
                default: //ISNOTMEMBER
                    break;
            }
        } catch(err){
            console.log('[ERROR] While getting data on gathering from DB ', err);
            // res.redirect('/gather');
            res.send(err);
        }
        // 작성자면 => [수정/삭제]
        // 모임원이면 => [탈퇴]
        console.log('obj test:', obj);
        res.render("gatherView", obj);

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
        
        const obj = {};
        if(req.user){
            obj.user=req.user;
        }
        obj.listCreated = await getGatherListAsLeader(req,res);// listCreated==false면 만든 목록 없는 것것
        obj.listJoined = await getGatherListAsMember(req,res);
        obj.listApplied = await getGatherListOfApply(req,res);
        // res.send(obj);
        res.render("gatherMine", obj);
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
        res.render("gatherRecruiting", obj);
        
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
        if(!req.query.no){
            console('There is no gathering number');
            res.redirect('/gather');
        }
        const _gatherId = req.query.no;
        var members;
        try{
            members = await searchParticipants(undefined, undefined, _gatherId);
            res.json(members);
        } catch(err){
            console.log(err, 'gatheringController-showMemberOfGathering');
        }
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

    createGather: async(req,res)=>{
        //gather.ejs 확인       1) gathering 생성 2) participant 추가
        if(!req.body){
            res.redirect("/gather/create");
        }
        if(!req.user){
            console.log('This user is not logged In');
            res.redirect('/auth/login');
        }
        const _memId = req.user.mem_id;
        // 왜 gatherData로 하면 안된느겨,,
        const gatherData = getGatherParams(req.body, ISCREATING, _memId);
        console.log('[createGather] 전달받은 값 확인: ', req.body, 'gatherData 확인: ', gatherData);
        // // 모임 데이터 생성
        try{
            await sequelize.transaction(async t => {
                result = await db.gathering.create(
                    gatherData,
                    {   //아뉘,, transaction 위치 때문에 안되는 거였다. 231215
                        transaction: t,
                        raw: true,
                    }
                );
            })

            await sequelize.transaction(async t=>{
                await db.participant.create({
                    gathering_id: result.gathering_id,
                    mem_id: _memId,
                    message: '',
                    state: ISLEADER,
                    isConnected: 0,
                },
                {transaction: t});
            })
            res.redirect(`/gather/view?no=${result.dataValues.gathering_id}`);
            // res.redirect('/gather');
            res.send(result);
        } catch(err){
            console.log(`Error creating gathering, participant:`, err);
            // res.redirect("/gather/create");
            res.send(err);
        }
    },

    updateGather: async(req, res, next)=>{
        console.log('updateGather 도착');
        //gather.ejs 확인       1) gathering 생성 2) participant 추가
        if(!req.body){
            res.redirect("/gather/create");
        }
        if(!req.user){
            console.log('This user is not logged In');
            res.redirect('/auth/login');
        }
        if(!req.query.no){
            console.log('There is no number of gather');
            res.redirect('/gather')
        }
        const _memId = req.user.mem_id;
        const _gatherId = req.query.no;

        const gatherData = getGatherParams(req.body, ISMODIFYING, _memId);
        console.log('[createGather] 전달받은 값 확인: ', req.body, 'gatherData 확인: ', gatherData);
        // // 모임 데이터 생성
        try{
            await sequelize.transaction(async t => {
                result = await db.gathering.update(
                    gatherData,
                    {   //아뉘,, transaction 위치 때문에 안되는 거였다. 231215
                        where: { gathering_id: _gatherId, leader_id: _memId },  // 리더 확인한느 건 혹시나 다른 유저가 할까봐
                        transaction: t,
                        raw: true,
                    }
                );
            })
            res.redirect(`/gather/view?no=${_gatherId}`);
            // res.redirect('/gather');
            // res.send(result);
        } catch(err){
            console.log(`Error updating gathering information:`, err);
            // res.redirect("/gather/create");
            res.send(err);
        }
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
        if(!req.user){
            res.redirect('/gather');
            console.log('[Wrong Access] This user is not logged in');
        }
        const _memId = req.user.mem_id;
        if(!req.query.no){
            res.redirect('/gather');
            console.log('[Uncertain Information] There is no gathering number');
        }
        const _gatherId = req.query.id;

        // 이미 가입 신청했는지 확인.
        // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️applied 대신 checkMember 사용!!!!!
        const applied = await searchParticipant(undefined, undefined, _gatherId, _memId);
        
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
            const gatherList = await this.searchGathers(undefined, undefined, undefined,undefined, {
                include:{
                    model: db.participant,
                    attributes: ['mem_id', 'mem_id'],
                    where: {
                        mem_id: memId,
                        state: { [Op.or]: [ISLEADER, ISMEMBER] }
                    },
                    as: "participants",
                },
                raw: true
            });
            //⚠️condition은 따로 해야하나?? overriding??
            //  await db.gathering.findAll({
            //     include:{
            //         model: db.participant,
            //         attributes: ['mem_id', 'mem_id'],
            //         where: {
            //             mem_id: memId,
            //             state: { [Op.or]: [ISLEADER, ISMEMBER] }
            //         },
            //         as: "participants",
            //     },
            //     raw: true
            // })
            // gatherList = list.map(i => i.dataValues);
            console.log('innerjoin한 모임목록: ', gatherList[0]['participants.mem_id']);
            // join한 attriubte는 ['']로 접근해야함!!!
            // DATA가 DB에서 검색하고 없으면 NON -CHAT LIST 띄위ㅓ.
            res.render("chatList", {user: req.user, dataList: gatherList, msg: '가입한 밥모임이 없어요'});

        } catch(err){
            console.log(err);
        }
        // 2. gathering_id ==> roomId / gathering_name 을 보여주고, chatList.ejs에서 input태그의 value를 roomId(gathering_id)로 하기

    },

    // 3. 그룹선택
    selectRoom: (req, res)=>{
        const obj = {};
        // 유저 로그인 x
        if(!req.query.roomId){
            console.log('There is no room number');
            res.redirect('/gather/chat/list');
        }
        const _gatherId = req.query.roomId;
        // 유저 로그인 x
        if(!req.user){
            console.log('This user is not logged In');
            res.redirect('/auth/login');
        }
        const user = req.user;
        // const _memId = req.user.mem_id;
        if(!req.query.name){
            console.log('There is no room name');
            res.redirect('/gather/chat/list');
        }
        obj.gatherName = req.query.name;

        // res.locals.roomId = _gatherId; //res // 선택한 그룹채팅방 id 가져오기.
        // console.log('DELETE: RoomId ',res.locals.roomId, '가 GET방식으로 전달 받은 값이다.- gController-selectRoom');
        // res.locals.name = req.query.name;
        // console.log('DELETE: name ',res.locals.name, '가 GET방식으로 전달 받은 값이다.- gController-selectRoom');
        obj.user= user;
        obj.roomId = _gatherId;
        res.render("chat", obj); //{user: req.user, roomId: res.locals.roomId, gatherName: res.locals.name});
        // res.redirect("/chat/room");
        // roomId값을 어케 전달하누
    },
    checkMember: async(req, res, next)=>{
        // res.locals.roomId = 3;
        // 유저 로그인 x
        if(!req.query.roomId){
            console.log('There is no room number');
            res.redirect('/gather/chat/list');
        }
        const _gatherId = req.query.roomId;
        // 유저 로그인 x
        if(!req.user){
            console.log('This user is not logged In');
            res.redirect('/auth/login');
        }
        const _memId = req.user.mem_id;
        console.log('roomId: ', res.locals.roomId, 'mem_id: ', _memId);

        const isMember= await searchParticipant(['mem_id'], [ISLEADER, ISMEMBER], _gatherId, _memId);
        // const isMember2 = await db.participant.findOne({
        //     attribute: ['mem_id'],
        //     where:{ 
        //         gathering_id: res.locals.roomId,
        //         mem_id: req.user.mem_id,
        //         state: { [Op.or]: [ISLEADER, ISMEMBER] }
        //     }
        // });
        // console.log('isMember- findOne한 결과값이 없으면 false가 나올까?, null 나옴.)',!isMember);
        // res.locals.roomId = _gatherId;   <-- 그럼 왜한거지? selectroomd에서 필요벗느데
        if (!isMember) { res.redirect('/gather/chat/list'); }
        next();
    },


}

getGatherListAsLeader= async(req, res)=>{
    // if(!req.user){
    //     console.log('[ERROR] This user is not logged in.');
    // } ==> 이거 하면 아예 그 페이지 접근 불가야
    const count = 6;    // 근데 페이지네이션하려면,,,,,,,,,,,,,,,,,,,,,,, 하하하,, 그때는 또 하나하나만 하니까 middleware에서 하면 되겟지 이게 뭘까
    var _memId = 0;
    if(req.user){
        _memId = req.user.mem_id; 
    }
    try {
        // 그냥 리더가 나인 거 하면 되자나!!
        result = await searchGatherings(undefined, undefined, undefined, undefined, {
            where: { leader_id: _memId },
            limit: count,
            raw: true
        });
        // console.log('레시퍼겸색겨롸', result ,'/');
        if(!result || result.length ==0){
            return false; // false면 
        }
        return result;
    } catch (err) {
        console.log('[ERROR] While finding gathering list of user as a leader', err);
        return false;// 이렇게 하면 될 거 같다
        //res.redirect('/gather/');
    }
};

getGatherListAsMember= async(req, res)=>{
    const count = 6;
    var _memId = 0;
    if(req.user){
        _memId = req.user.mem_id; 
    }
    try {
        const result = await searchGatherings(undefined, undefined, undefined, undefined, {
            // attr:x
            include: [{
                attributes: [['gathering_id', 'gathering_id']],
                model: db.participant,
                where: {
                    mem_id: _memId,
                    state: 1,
                },
                as: 'participants'
            }],
            order: [['createdAt', 'ASC']],
            limit: count,
            raw: true
        })
        // console.log('레시퍼겸색겨롸', result ,'/');
        if(!result || result.length ==0){
            return false; // false면 
        }
        return result;
    } catch (err) {
        console.log('[ERROR] While finding gathering list of user as a leader', err);
        return false;// 이렇게 하면 될 거 같다
        //res.redirect('/gather/');
    }
};

getGatherListOfApply = async(req, res)=>{
    const count = 6;
    var _memId = 0;
    if(req.user){
        _memId = req.user.mem_id; 
    }
    //페이지네이션은 어떻게 연결하지?
    try {
        // ㅓjoin으로
        const result = await searchGatherings(undefined, undefined, undefined, undefined, {
            // attr:x
            include: [{
                attributes: [['gathering_id', 'gathering_id']],
                model: db.participant,
                where: {
                    mem_id: _memId,
                    state: [2,3],
                },
                as: 'participants'
            }],
            order: [['createdAt', 'ASC']],
            limit: count, // 뭐가 없으면 ? : coutn
            raw: true
        })
        // console.log('레시퍼겸색겨롸', result ,'/');
        if(!result || result.length ==0){
            return false; // false면 
        }
        return result;
    } catch (err) {
        console.log('[ERROR] While finding gathering list of user as a leader', err);
        return false;// 이렇게 하면 될 거 같다
        //res.redirect('/gather/');
    }
};








    // test: async (req, res)=>{
    //     console.time('쿼리 한번에 하는 거');
    //     const user = req.query.user;
    //     // include 이용해서 조인 테스트
    //     try{
    //         const list = await db.gathering.findAll({
    //             attributes: ['gathering_id', 'leader_id'], // gathering 테이블의 열을 선택
    //             include: [{
    //                 model: db.participant,
    //                 attributes: [['gathering_id','gathering_id'], ['mem_id','mem_id']], // participants 테이블의 열을 선택
    //                 as: 'participants',
    //                 where: {
    //                     mem_id: user
    //                 },
    //                 required: true,
    //                 raw: true,  // dataValues만 보인다는데 효과x
    //             }]
    //         });
    //         gatherList = list.map(i => i.dataValues);
    //         console.log(gatherList);
    //         var partList = [];
            
    //         // 확인이 안됨. list.participants로는 
    //         for (child of gatherList){
    //             partList.push(child.participants.map(i=>i.dataValues));
    //         }
    //         console.log('참여자 확인: ', partList);
    //         // console.log('list: ', list);
    //         // console.log('join test: ', list[0].gathering_id);
    //         // const arr = list.map(i => i.gathering_id);
    //         // console.log(arr);
    //         res.send(list);
    //         console.timeEnd('쿼리 한번에 하는 거');
    //     } catch(err){
    //         console.log(err);
    //     }

    // },
    // test2: async(req, res)=>{
    //     console.time('쿼리 따로 따로');
    //     const user = req.query.user;
    //     try{
    //         var partList = await searchGatherings(['gathering_id'], undefined, undefined, user)
    //         var partList = await db.participant.findAll({
    //             attributes: ['gathering_id'],
    //             where: {
    //                 mem_id: user
    //             }
    //         });
    //         partList = partList.map(i=>i.dataValues); // 그러면 key 값이 없이 그냥 1,2만 나옴

    //         console.log('타입; ', partList);

    //         var gatherList = await db.gathering.findAll({
    //             attributes: ['gathering_id', 'leader_id'], // gathering 테이블의 열을 선택
    //             where: {[Op.or]: partList}
    //         });
    //         // gatherList = list.map(i => i.dataValues);
    //         console.log(gatherList);
    //         res.send(gatherList);
    //         console.timeEnd('쿼리 따로 따로');
    //     } catch(err){
    //         console.log(err);
    //     }


    //     // const posts = await db.post.findAll({
    //     //     // where,
    //     //     limit: 10,
    //     //     include: [{
    //     //       model: db.post_image, // 게시글의 이미지
    //     //       as: 'post_images'
    //     //     }, {
    //     //       model: db.post_comment, // 게시글의 댓글
    //     //     //   include: [{
    //     //     //     model: db.member, //댓글을 쓴 사람
    //     //     //     attributes: ['mem_id', 'name'],
                
    //     //     //   }],
    //     //       as: 'post_comments',
    //     //     }, {
    //     //       model: db.post_like, // 좋아요 누른 사람
    //     //       as: 'post_likes',
    //     //       attributes: ['mem_id'],
    //     //     }],
    //     //     order: [
    //     //       ['createdAt', 'DESC'],
    //     //       ['post_comments', 'createdAt', 'DESC']
    //     //     ],
    //     //   });
    //     //   const dataList = posts.map(i=>i.dataValues);
    //     //   var nestedList =[];
    //     //   for (child of dataList){
    //     //     nestedList = child.post_comments.map(i=>i.dataValues);            
    //     //   }
    //     //   console.log(nestedList);

    //     //   console.log(dataList);
    //     //   res.send(dataList);
    // },