// 로그인 회원가입 authenticate를 auth.js로 라우터를 만드는게낭르까
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { isNotLoggedIn } = require('./middlewares');
const passport = require('passport');

router.get("/signup", memberController.new);
router.post("/signup", memberController.create);
router.get("/login", memberController.login);
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
}));
router.get("/logout", memberController.logout);


module.exports = router;
/*
app.post('/auth/login_process',
  passport.authenticate('local', { failureRedirect: '/auth/login'}),
  function(req,res){
    req.session.save(function(){
      res.redirect('/');      
    });
});

로그아웃 이후 바로 세션 삭제되지 않아서 세션 삭제 확인 후 리디렉션하는 코드가 req.session.save ㅇ였는데
로그인할 때에도 이와 같은 일이 발생하기 때문에 역시 req.session.save를 써준다.
*/

    // router.post("/login", (req, res, next) => {
    //   passport.authenticate("local", (authError, user, info) => {
    //     // local에 대한 인증 방법이다. 성공하면 user에 사용자의 데이터가 들어간다.
    //     if (authError) { // 인증 에러
    //       console.error(authError);
    //       return next(authError);
    //     }
    //     if (!user) { // 입력된 user가 없으면
    //       return res.redirect("/auth/login");
    //     }
    //     // user가 있으면 리턴
    //     return req.login(user, (loginError) => {
    //       if (loginError) {
    //         console.error(loginError);
    //         return next(loginError);
    //       }
    //       return res.redirect("/"); // 원하는 곳으로 보내줌
    //     });
    //   })(req, res, next); 
    //   // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
    // });