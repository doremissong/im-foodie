const { db, sequelize } = require('../models/index');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        //res.status(403).send('로그인 필요');
        res.redirect('/auth/login');    //이전 화면으로 돌아가는 건 어떻게 할까. 메인으로 돌아가면 좀 그래.
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

exports.setDBModel = (modelType)=>{
    return (req, res, next)=>{
        // if(mod)
        res.locals.model = modelType;
        next();
    }
    // console.log(modelType, "'s model type is", typeof modelType);
    // modelType.findOne({where:{mem_id:'mint'}}).then((member_id)=>console.log('모델 타입 파라미터로 주고 동작하는지 확인.',member_id));
    // ⚠️에러 처리는
}

exports.setCondition = (condition) =>{
    return (req, res, next)=>{
        res.locals.condition = condition;
        next();
    }
    // condition은 {"category":"restaurant"} 형식.
}
// exports.getModel();// 무슨 모델인지 가져와야함.

// 1) 어떤 디비 가져올지랑
// 2) 어떤 게시판 볼지 확인해야함.
exports.getPaginationInfo = async (req, res, next)=>{
    // ❤️ condition을 req.query로 받아도 되지 않을까? 라우터가 넘 번잡해
    const model = res.locals.model;
    const condition = res.locals.condition;
    const selectedCategory = req.body.category;

    //res.redirect("/board/" + 1);
    // 한페이지에 보여질 포스트 개수
    var countPerPage = req.query.countperpage;
    // 페이지 번호
    var pageNo = req.query.pageno;
    // 세트 사이즈
    var setSize = req.query.setsize;

    countPerPage = this.setPagingVar(countPerPage, 1);
    pageNo = this.setPagingVar(pageNo, 1);
    // //❓query 스트링이 페이지 범위를 넘어가면
    if (pageNo < 0 || pageNo > totalPage) {
        pageNo = 1;
    }
    setSize = setPagingVar(setSize, 2);

    // 특정 게시판도 글 개수 세기
    var totalPost = await model.count({
        where: condition,
    })
        .catch(() => {
            console.log(`ERROR: while counting post. ${err.message}`);
        })
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
    console.log(startItemNo);
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

    const dataList = await model.findAll({
        where: condition,
        order: [["createdAt", "DESC"]],
        limit: countPerPage,
        offset: startItemNo
    });

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

    res.locals.paginationInfo = paginationInfo;
    res.locals.dataList = dataList;
    return next();
}
// module.exports = { isLoggedIn, isNotLoggedIn };

// exports.generateRandomPassword = ()=>{
//     // const randomPassword = Math.random().toString(36).substr(2, 10);
//     const randomPassword = Math.random().toString(36).slice(2);
//     return randomPassword;
// }
var test = async (model)=>{
    const dataList = await model.findAll();
    return dataList;
}

var test2 = ()=>{
    console.log('배아파');
}
test2();
// test(db.member).then(info=>console.log(info));
console.log(this.setDBModel(db.member));