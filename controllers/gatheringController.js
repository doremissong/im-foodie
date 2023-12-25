const gathering = require('../models/gathering');
const {db, sequelize,} = require('../models/index');
const { Op, Sequelize } = require('sequelize');
const participant = require('../models/participant');
const recipe_step = require('../models/recipe_step');
// const { getPaginationInfo } = require('./middlewares');
const RECRUITING = 0, COMPLETED = 1;
const ISCREATING = 0, ISMODIFYING = 1;
const ISLEADER = 0, ISMEMBER = 1, ISAPPLYING = 2, ISREFUSED = 3, ISNOTMEMBER =4;
const NOT_ENTERED = 0,
    CONNECTED = 1,
    DISCONNECTED = 2;
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
            place: info.place?info.place:'미정',
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
// testInclude = async()=>{    // INCLUDE는 undefined로 해야 안됨
//     const result = await db.gathering.findAll({
//         where: {
//             leader_id: 'brown'
//         },
//         include:undefined
//     });
//     console.log('include result:', result);
// }
// testInclude();

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
        // console.log('recruiting list result:', recruitingList);

        const completedList = await searchGatherings(undefined, undefined, undefined, undefined, {
            where: { state: COMPLETED },
            order: [['createdAt', 'DESC']],
            limit: limit,
        });
        // console.log('모집완료 검색결과?', completedList =="");

        obj.recruitingList = recruitingList;
        obj.completedList = completedList;
        
        res.render("gather/gather", obj);
    },

    showCreatePage: (req, res)=>{
        const obj ={};
        if(req.user){
            obj.user = req.user;
        }
        // res.render("createGather", obj);
        res.render("gather/gatherCreate", obj);
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
        res.render("gather/gatherUpdate", obj);
    },

     // /gather/view?id나 no=gathering_id 화면
    showView: async(req, res)=>{
        // 가져오기 정보.
        const obj = {};
        // 유효성
        if(req.user){
            obj.user = req.user;
        }
        const _memId = req.user? req.user.mem_id : '';   //undefined하면 who가 0이됨
        if(!req.query.no){
            console.log('There is no number of gather');
            res.redirect('/gather')
        }
        const _gatherId = req.query.no;

        // 1) 모임 정보 가져가기
        try {
            //  (_cols, _state, _gatherId, _leaderId) 
            var data = await searchGathering(undefined, undefined, _gatherId, undefined);
            if (!data || data.length == 0) { // 검색어 없으면 
                console.log('[ERROR] WRONG ACCESS');
                res.redirect('/gather');
                // return;
            } else{
                obj.gatherData = data;
            }
            // console.log('obj test:', obj);
        } catch(err){
            console.log('[ERROR] While getting data on gathering from DB ', err);
            res.redirect('/gather');
            // res.send(err);
        }

        // 2) 모임 설명 하단, 관계자 표시 영역
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
            var userStatus = await searchParticipant(['state', 'gathering_id', 'mem_id', 'updatedAt', 'message'], undefined, _gatherId, _memId);
            if(!userStatus || userStatus.length ==0 || typeof userStatus == 'undefined'){
                who = ISNOTMEMBER;
            } else{
                who = userStatus.state;
            }
            obj.who = who;
            console.log('who:', who);
            switch(who){
                case ISLEADER:  
                console.log('switch');
                    // console.log('switch동작');
                    obj.memberList = await searchParticipants(undefined, [ISLEADER, ISMEMBER], _gatherId, undefined);
                    // 해당 모임의 가입신청한 유저 목록 저장
                    obj.applicantList = await searchParticipants(undefined, ISAPPLYING, _gatherId, undefined);
                case ISMEMBER:
                    console.log('switch');
                    // 모임원 목록
                    obj.memberList = await searchParticipants(undefined, [ISLEADER, ISMEMBER], _gatherId, undefined);
                    break;
                case ISAPPLYING:
                    obj.statusInfo = userStatus;
                    // 메시지: [] | 상태 [신청중] | 신청일자: []
                    //⚠️지원자는 버튼 클릭하면 이미 신청했어요!
                    // break;
                case ISREFUSED:
                    obj.statusInfo = userStatus;
                    // 메시지: [] | 상태 [거절] | [재신청] | 신청일자: []
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
        res.render("gather/gatherView", obj);

    },
    showCertainList: async(req, res)=>{
        var certainName = '';
        const obj = {};
        if (req.user) {
            obj.user = req.user;
        }
        if (!res.locals.paginationInfo || !res.locals.dataList) {
            console.log('[ERROR] check pagination data.');
            // res.redirect(res.locals.history);
            res.redirect('/gather');
        }
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;

        const mode = req.url.split('?',1).join('').slice(1);    // 배열 -> 문자열
        switch (mode) {
            case 'completed':
                certainName = 'gather/gatherCompleted';
                break;
            case 'recruiting':
                certainName = 'gather/gatherRecruiting';
                break;
            case 'imade':
                certainName = 'gather/gatherImade';
                break;
            case 'joined':
                certainName ='gather/gatherJoined';
                break;
            case 'applied':
                certainName = 'gather/gatherApplied';
                // console.log('신청한 거:', obj.dataList[0].dataValues.participants[0].dataValues.state);
                const stateList = obj.dataList.map(data => data.participants[0].dataValues.state);
                // console.log('test', stateList);
                obj.stateList = stateList;
                // console.log('스테이트', ptctList);
                break;
            default:
                res.redirect('/gather');
                break;
        }
        res.render(certainName, obj);
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
        res.render("gather/gatherMine", obj);
    },

    showIAppliedPage: async (req, res) => {   // 페이지네이션 필요
        const obj = {};
        if(req.user){
            obj.user=req.user;
        }
        if(!res.locals.paginationInfo || !res.locals.dataList){
            console.log('[ERROR] check pagination data.');
            // res.redirect(res.locals.history);
            res.redirect('/gather');
        }
        console.log(res.locals.dataList);
        
        //아니,, 신청중, 거절됨은 state도 participant state가 필요함.
        obj.pagination = res.locals.paginationInfo;
        obj.dataList = res.locals.dataList;
        res.render("gather/gatherApplied", obj);

    },
        


    findGatheringId: async (req, res, next)=>{
        // recipe 서치 참고. 아니면 공지사항 서치 참고
        
        if(!req.user){
            console.log('This user is not logged In');
            res.redirect('/auth/login');
        }
        const memId = req.user.mem_id;
        // res.locals.condition={};
        const obj = { mem_id: memId };
        res.locals.condition = {};
        // res.locals.condition.mem_id= memId;
        const mode = req.url.split('?',1).join('').slice(1);    // 배열 -> 문자열
        switch (mode) {
            case 'imade':
                // res.locals.condition.state = ISLEADER;
                obj.state = ISLEADER;
                break;
            case 'joined':
                // res.locals.condition.state = ISMEMBER;
                obj.state = ISMEMBER;
                break;
            case 'applied':
                // res.locals.condition.state = [ISAPPLYING, ISREFUSED];
                obj.state = [ISAPPLYING, ISREFUSED];
                res.locals.includeCondition = {
                    model: db.participant,
                    attributes: ['state', 'state'],
                    where: { 
                        mem_id: memId,
                        state: [ISAPPLYING, ISREFUSED] 
                    },
                    as: "participants",
                }
                break;
            default:
                res.redirect('/gather');
                break;
        }
        // res.locals.condition = obj;
        const gatherData = await searchParticipants(['gathering_id', 'state'], obj.state, undefined, memId);
        console.log('검색한 모임 아이디 결과:', gatherData);
        // console.log(obj, 'gctl');
        if (gatherData && gatherData.length != 0) {
            res.locals.condition.gathering_id = gatherData.map(data => data.gathering_id);
            // if(mode=='applied'){
            //     const arr = [];
            //     for (let i = 0; i < gatherData.length;){
            //         arr[gatherData[i].gathering_id].push(gatherData[i].state);
            //     }
            //     console.log('아이디랑 state짝짓기', arr);
            // }
            
        }
        // console.log(res.locals.condition, 'gctl');
        // res.locals.condition = obj;
        console.log(res.locals.condition, 'gctl');

        next();
        // res.send(obj); //0은 빈배열 리턴
    },

    //⚠️ 동작 확인 231223
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

                await db.participant.create({
                    gathering_id: result.gathering_id,
                    mem_id: _memId,
                    message: '',
                    state: ISLEADER,
                    isConnected: 0,
                },
                {transaction: t});

                //⚠️ 동작 확인
                await db.chat.create({
                    gathering_id: result.gathering_id,
                    mem_id: _memId,
                    content: `${_memId}(방장)님이 입장하셨습니다.`,
                },
                {transaction: t});
            })

            res.redirect(`/gather/view?no=${result.gathering_id}`);
            // res.redirect('/gather');
            // res.send(result);
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
    },

    // 모임 
    applyForGather: async(req, res)=>{
        //⚠️⚠️⚠️try문 req.query 유효성 검사
        // res.send(req.body);
        if(!req.user){
            res.redirect('/gather');
            console.log('[Wrong Access] This user is not logged in');
        }
        const _memId = req.user.mem_id;
        if(!req.query.no){
            res.redirect('/gather');
            console.log('[Uncertain Information] There is no gathering number');
        }
        const _gatherId = req.query.no;
        const _message = req.body.message;
        var isApplying = false;
        console.log(req.body);
        console.log(_message, '메시이지ㅣ');
        // 해당 모임이 모집중인지 확인해야함. 아냐 화면이 이동이 없으니까 url 손대지는 못할거야

        // 신청 가능한지 확인(아예 없거나, ISREJECTED) / (ISLEADER, ISMEMBER는 불가능)
        try{
            const userState = await searchParticipant(['state'], undefined, _gatherId, _memId);
            // console.log('applyfor result', userState);
            if(!userState || userState.length==0){
                isApplying = true
            } else{
                if (userState.state == ISREFUSED) { // 3
                    isApplying = true;            
                } else if (userState.state == ISNOTMEMBER) {    // 4
                    isApplying = true; 
                } else if (userState.state == ISLEADER) {   // 0
                    res.write("<script>alert('이 밥모임의 방장입니다.');</script>");
                } else if (userState.state == ISMEMBER) {   // 1
                    res.write("<script>alert('이미 가입한 밥모임입니다.');</script>");
                } else { //userState.state==ISAPPLYING){    // 2
                    res.write("<script>alert('이미 신청한 밥모임입니다.');</script>");
                }
            }
        } catch(err){
            console.log('[ERROR] while checking participant table', err);
            res.write("<script>alert('다시 시도해주세요.');</script>");
        }
        if(isApplying){
            const [result, created] = await db.participant.upsert({
                gathering_id: _gatherId,
                mem_id: _memId,
                state: ISAPPLYING,
                message: _message
            });
            // console.log('참가자 테이블이', (created)?'추가되었습니다.':'수정되었습니다.');
            res.write("<script>alert('신청하였습니다.');</script>");
        } 

        // console.log(_gatherId,'에 신청한다');
        // res.write("<script>alert('failed');</script>");
    },

    acceptMember: async(req, res)=>{
        // 유효성
        // 1) 유저
        if(!req.user){
            console.log('This user is not logged in');
            res.redirect('/gather');
        }
        const _memId = req.user.mem_id; //필요없군
        
        if(!req.query.no || !req.query.aplctId){
            console.log('There is no gathering number or applicant id');
            req.redirect('/gather');
        }

        // 변수 저장
        const _gatherId = req.query.no;
        const _applicantId = req.query.aplctId;
        // console.log('전달값 확인:', _memId, _gatherId, _applicantId);/
        // 서치하자. query로 하면 수정할 수 있으니까.
        // ❌ const {_leaderId, _maxCount, _curCount} = await searchGathering(['leader_id', 'maximumHeadCount', 'currentHeadCount'], undefined, _gatherId);
        try {
            const gatherInfo = await searchGathering(['leader_id', 'maximumHeadCount', 'currentHeadCount'], undefined, _gatherId);
            if (!gatherInfo || gatherInfo.length == 0) {
                res.write('<script>alert("잘못된 접근입니다.");</script>');
            } else {
                const _leaderId = gatherInfo.leader_id;
                const _maxCount = gatherInfo.maximumHeadCount;
                const _curCount = gatherInfo.currentHeadCount;
                console.log('쿼리값', _leaderId, _maxCount, _curCount);

                if (req.user.mem_id != _leaderId) {
                    res.write('<script>alert("방장 권한이 없습니다.");</script>');
                } else { // 따로 if문 하면 동시에 실행돼서 알림창 두번 뜰까봐
                    if (_maxCount > _curCount) {    // 수락 가능
                        const result = await db.participant.update(    //upsert일리 없지. 이미 있는 isapplying애들 받는거니가
                            { state: ISMEMBER },
                            {
                                where: {
                                    gathering_id: _gatherId,
                                    mem_id: _applicantId,
                                }
                            }
                        )
                        console.log('update result: ', result);
                        res.write(`<script>alert('${_applicantId}님이 멤버가 되었습니다.');</script>`);// 왜 화면 바뀜?

                    } else { // 수락 불가능
                        res.write('<script>alert("현재 최대인원으로 수락할 수 없습니다. 최대인원을 변경해보세요.");</script>');
                    }
                }
            }
        } catch (err) {
            console.log(`Error adding gathering member: ${err}`);
            res.write('<script>alert("다시 시도해주세요");</script>');
        }
        // 하고 끝나야하는데 다음 줄까지 간닪마리야
        // 그러면 esle문ㅇ로해?
        // if(req.query.)
    },
    refuseMember: async(req, res)=>{
        // 유효성
        // 1) 유저
        if(!req.user){
            console.log('This user is not logged in');
            res.redirect('/gather');
        }
        const _memId = req.user.mem_id;
        
        if(!req.query.no || !req.query.aplctId){
            console.log('There is no gathering number or applicant id');
            req.redirect('/gather');
        }
        const _gatherId = req.query.no;
        const _applicantId = req.query.aplctId;
        console.log('전달값 확인:', _memId, _gatherId, _applicantId);
        try{
            const gatherInfo = await searchGathering(['leader_id', 'maximumHeadCount', 'currentHeadCount'], undefined, _gatherId);
            if (!gatherInfo || gatherInfo.length == 0) {
                res.write('<script>alert("잘못된 접근입니다.");</script>');
            } else {
                const _leaderId = gatherInfo.leader_id;
                const _maxCount = gatherInfo.maximumHeadCount;
                const _curCount = gatherInfo.currentHeadCount;
                console.log('쿼리값', _leaderId, _maxCount, _curCount);

                if (req.user.mem_id != _leaderId) {
                    res.write('<script>alert("방장 권한이 없습니다.");</script>');
                } else {
                    // participant 테이블에 _ISREFUSED로 변경
                    const result = await db.participant.update(    //upsert일리 없지. 이미 있는 isapplying애들 받는거니가
                        { state: ISREFUSED },
                        {
                            where: {
                                gathering_id: _gatherId,
                                mem_id: _applicantId,
                            }
                        }
                    )
                    console.log('update result: ', result);
                    res.write(`<script>alert('${_applicantId}님의 신청을 거절했습니다.');</script>`);
                }
            }
        }catch (err) {
            console.log(`Error refusing gathering member: ${err}`);
            res.write('<script>alert("다시 시도해주세요");</script>');
        }
    },

    banMember: async(req, res)=>{
        // 유효성
        // 1) 유저
        if(!req.user){
            console.log('This user is not logged in');
            res.redirect('/gather');
        }
        // const leaderId = req.user.mem_id;
        
        if(!req.query.no || !req.query.memId){
            console.log('There is no gathering number or member id');
            res.redirect('/gather');
        }
        const _gatherId = req.query.no;
        const _memId = req.query.memId;
        const message = ['님을 강퇴합니다.', '님이 탈퇴하셨습니다.', '님이 신청을 취소하셨습니다.'];
        // console.log('전달값 확인:', _memId, _gatherId, _memberId);
        try {
            const gatherInfo = await searchGathering(['leader_id', 'maximumHeadCount', 'currentHeadCount'], undefined, _gatherId);
            if (!gatherInfo || gatherInfo.length == 0) {
                res.write('<script>alert("잘못된 접근입니다.");</script>');
            } else {
                const _leaderId = gatherInfo.leader_id;
                const _maxCount = gatherInfo.maximumHeadCount;
                const _curCount = gatherInfo.currentHeadCount;
                console.log('쿼리값', _leaderId, _maxCount, _curCount);

                // if (leaderId != _leaderId) {
                //     res.write('<script>alert("방장 권한이 없습니다.");</script>');
                // } else {
                // participant 테이블에 _ISREFUSED로 변경
                const result = await db.participant.update(    //upsert일리 없지. 이미 있는 isapplying애들 받는거니가
                    { state: ISNOTMEMBER },
                    {
                        where: {
                            gathering_id: _gatherId,
                            mem_id: _memId,
                        }
                    }
                )
                console.log('Ban result: ', result);
                res.write(`<script>alert("${_memId}${message[req.query.mode ? req.query.mode : 0]}");</script>`);
            }
        } catch(err){
            console.log(`Error deleting gathering member: ${err}`);
            res.write('<script>alert("다시 시도해주세요");</script>');
        }
    },

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
            const gatherList = await searchGatherings(undefined, undefined, undefined,undefined, {
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

        try{
            const isMember = await searchParticipant(['mem_id'], [ISLEADER, ISMEMBER], _gatherId, _memId);
            if (!isMember) { res.redirect('/gather/chat/list'); }
            else { 
                next();
            }
        } catch(err){
            console.log('[ERROR] While searching participant table', err);
            next(err);
        }
        // res.locals.roomId = _gatherId;   <-- 그럼 왜한거지? selectroomd에서 필요벗느데
        // next();
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