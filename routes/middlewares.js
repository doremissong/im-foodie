const { db, sequelize } = require('../models/index');
const { Op } = require('sequelize');
const post_comment = require('../models/post_comment');

const RECRUITING = 0;
const COMPLETED = 1;
const ISLEADER = 0;
// ISMEMBER = 1,
// ISAPPLYING 
// ISACCEPTED
// ISREFUSED

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        //res.status(403).send('로그인 필요');
        res.redirect('/auth/login');    //이전 화면으로 돌아가는 건 어떻게 할까. 메인으로 돌아가면 좀 그래.
        // next();
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        //const message = encodeURIComponent('로그인한 상태');
        //res.redirect(`/?error=${message}`);
        res.redirect('/');
    }
};

//https://velog.io/@bik1111/Node.js-mysql-session-store-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0
exports.localsMiddleware = (req,res,next)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.currentUser = req.session.user || null;
    next();
}

// 나중에 따로 빼기 memberController에도 있음.
exports.isEmpty = (value) => {
    if( value === "" || value === null || value === undefined || ( value != null && typeof value === "object" && !Object.keys(value).length ) ){
      return true
    }else{
      return false
    }
  };


exports.isOwner = (req,res)=>{
    if(req.user)
        return true;
    else
        return false;
};


exports.setPagingVar=(variables, defaultValue) =>{
    if(variables == undefined || typeof variables == "undefined" || variables == null){
        return defaultValue;
    } else {
        return parseInt(variables);
    }
};
// exports.setPagingVar;

exports.setDBModel = (modelType) => {
    return (req, res, next) => {
        res.locals.model = modelType;
        console.log(modelType, "'s model type is", typeof modelType);
        console.log(res.locals.condition, 'mw');
        res.locals.condition = res.locals.condition? res.locals.condition : {};

        // gathering
        if(req.query.gsort){
            if(req.query.gsort == RECRUITING){
                res.locals.condition.state = RECRUITING;
            } else if(req.query.gsort == COMPLETED){
                res.locals.condition.state = COMPLETED;
            } else{
                res.redirect('/gather');
            }
        }

        //⚠️
        if (req.query.search) {
            //https://chat.openai.com/c/0a8f8a3e-4fd7-4696-b557-72feb171eb1c
            const term = req.query.search;
            res.locals.condition = {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${term}%`
                        },
                    },
                    {
                        content: {
                            [Op.like]: `%${term}%`
                        }
                    },
                    {
                        // 다 mem_id로 바꿔버려?
                        writer_id: {
                            [Op.like]: `%${term}%`
                        }
                    }
                ]
            }
        }

        if (res.locals.category) { // post의 경우, 게시판 목록 페이지네이션
            res.locals.condition.category = res.locals.category;
            // console.log('[setDBModel]',res.locals.condition.category, '게시판 카테고리 값 확인');
        }
        if (req.query.no) {   //해당 글의 id - 댓글 페이지네이션용
            if(modelType==db.post || modelType == db.post_comment){
                res.locals.condition.post_id = req.query.no;
            } else if(modelType==db.recipe || modelType == db.recipe_comment){
                res.locals.condition.recipe_id = req.query.no;
                console.log(res.locals.condition, 'mdw');
            }
        }
        
        if (req.query.sort) {
            const sort = req.query.sort;
            // 최신순latest = [["createdAt", "DESC"]],
            // 조회수순 = [["viewCount", "DESC"]],
            // 좋아요 순 = 이건 나중에 - 레시피, 게시판, 모임별 다 따로 
            if (sort == "viewCount") {
                res.locals.sort = [["viewCount", "DESC"]]
            }
            else if(sort == "earliest"){
                res.locals.sort = [["createdAt", "ASC"]]
            }
            // else if(sort=="like"){
            // }
        }
        next();
    }
    // ⚠️에러 처리는
}


// exports.getModel();// 무슨 모델인지 가져와야함.

// 1) 어떤 디비 가져올지랑
// 2) 어떤 게시판 볼지 확인해야함.
exports.getPaginationInfo = async (req, res, next)=>{
    // ❤️ condition을 req.query로 받아도 되지 않을까? 라우터가 넘 번잡해

    // console.log('include 값:', res.locals.includeCondition);
    // res.locals에 model, condition이 저장되지 않았으면 에러 페이지 이동하게 해야함.
    const model = res.locals.model;
    if(this.isEmpty(model)){
        res.send('페이지네이션 모델이 없다. 홈으로 돌아가!!!!');
    }
    const condition = res.locals.condition;

    //res.redirect("/board/" + 1);countperpage=2
    // 한페이지에 보여질 포스트 개수
    var countPerPage = req.query.countperpage;
    // 페이지 번호
    var pageNo = req.query.pageno;
    // 세트 사이즈
    var setSize = req.query.setsize;
    
// pageNo는 현재페이지. setPagingVar는 값이 안정해졌을 때, 임의로 정하는 것임.
    // 여기서 한 페이지당 글 개수, 페이지, 1,10까지 보여준는 거.
    countPerPage = this.setPagingVar(countPerPage, 10);
    pageNo = this.setPagingVar(pageNo, 1);  
    // //❓query 스트링이 페이지 범위를 넘어가면
    if (pageNo < 0 || pageNo > totalPage) {
        pageNo = 1;
    }
    setSize = this.setPagingVar(setSize, 10);

    // 특정 게시판도 글 개수 세기
    var totalPost = await model.findAll({
        include: res.locals.includeCondition?res.locals.includeCondition:undefined,
        where: condition,
    }).catch((err) => {
    console.log(`ERROR: while counting post. ${err.message}`);
    });
    totalPost = totalPost.length;
    // console.log(totalPost2.length, '조인결과');
    // var totalPost = await model.count({
    //         include: res.locals.includeCondition?res.locals.includeCondition:undefined,
    //         where: condition,
    // }).catch((err) => {
    //     console.log(`ERROR: while counting post. ${err.message}`);
    // });
    if (totalPost < 0) {
        totalPost = 0;
    }
    // // 총 페이지 수
    var totalPage = Math.ceil(totalPost / countPerPage);
    // // 총 세트 수
    var totalSet = Math.ceil(totalPage / setSize) // ejs 건네줄 필욘ㄴ 없는듯
    // 현재 세트
    var curSet = Math.ceil(pageNo / setSize);
    // 페이지  < 사이 값 >
    var startPage = (curSet - 1) * setSize + 1;
    var endPage = startPage + setSize - 1;
    var previousPage = 0, nextPage = 0;    // 이거는 ejs에서 js 코드 써야겠다.
    // 글 번호. 페이징할 때
    var startItemNo = (pageNo - 1) * countPerPage;    // itemOffset이 낫겠어
    // console.log(startItemNo, '해당 페이지의 글 번호');
    var endItemNo = Math.min(startItemNo + countPerPage - 1, totalPost);   // 수정좀 if로 따로 하는게 낫나?
    if (curSet == 1) {
        previousPage = 0;// < 표시 안해
    } else {
        previousPage = startPage - 1;
    }
    if (curSet == totalSet) {   // 마지막 set이면
        nextPage = 0; // > 표시 안해
        endPage = totalPage;
        endItemNo = totalPost;  //얜 별개인가?
    } else {
        nextPage = endPage + 1;
    }

    //위에 카운트에서도 되던게 여기선 안되는매직
    try {
        const dataList = await model.findAll({
            include: res.locals.includeCondition?res.locals.includeCondition:undefined,
            where: condition,
            order: res.locals.sort? res.locals.sort: [["createdAt", "DESC"]],
            limit: countPerPage,
            offset: startItemNo,
            // raw:true
        });
        res.locals.dataList = dataList;
        // console.log('middleware - pagination - dataList 값 확인:', dataList, typeof dataList);
    } catch (err) {
        console.log('[Error]: while getting data from DB -mw', err.message);
    }
    // 빈 값은 [] == ''

    paginationInfo = {};
    paginationInfo.pageNo = pageNo; // 현재 페이지 볼드 표시
    paginationInfo.curSet = curSet; // ⚠️필요할까?
    paginationInfo.countPerPage = countPerPage; // ⚠️필요할까?
    paginationInfo.setSize = setSize;   // ⚠️세트 10 사이즈 필요해?
    paginationInfo.totalPost = totalPost; // 총 글 개수가 필요해? 글 몇개 있는지 상단에 표시하자
    paginationInfo.totalSet = totalSet; //⚠️필요해?   몇 세트 있는지 필요해?
    paginationInfo.totalPage = totalPage;
    paginationInfo.startPage = startPage;   // 하단 첫번째 페이지 번호
    paginationInfo.endPage = endPage;   // 하단 마지막 페이지 번호
    paginationInfo.previousPage = previousPage; // 하단 < 링크
    paginationInfo.nextPage = nextPage; // 하단 > 링크
    paginationInfo.startItemNo = startItemNo; // 글 번호 표기할 때 필요. // 이거하면 좋겠는데.
    paginationInfo.endItemNo = endItemNo;

    // console.log('middleware - paginationinfo 값 확인:', paginationInfo);    //, typeof paginationInfo
    res.locals.paginationInfo = paginationInfo;
    // console.log('middleware - paginationinfo 값 확인:', res.locals.paginationInfo); 
    // console.log('middleware - datalist chck ', res.locals.dataList.length);
    return next();
}

// create, update, delete 에는 두지 말고, / myroom은 로그인 안하면 못보고. 근데 이전페이지로 돌아가는게 로그인한 상황에서 필요할까ㅓ?
exports.storeUrl = (req, res, next)=>{
    req.session.previousUrl = req.originalUrl;
    // console.log('req.url: ', req.originalUrl);
    console.log('현재 세션 url:',  req.session);//.previousUrl);
    next();
}
// ⚠️ 지워야하나.
exports.redirect = (req, res)=>{
    const previousUrl = req.session.previousUrl || '/';
    res.redirect(previousUrl);
}



// module.exports = { isLoggedIn, isNotLoggedIn };

// exports.generateRandomPassword = ()=>{
//     // const randomPassword = Math.random().toString(36).substr(2, 10);
//     const randomPassword = Math.random().toString(36).slice(2);
//     return randomPassword;
// }
