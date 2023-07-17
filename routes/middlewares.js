exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태');
        res.redirect(`/?error=${message}`);
    }
};

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

