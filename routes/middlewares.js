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
// module.exports = { isLoggedIn, isNotLoggedIn };

