// 로그인 회원가입 authenticate를 auth.js로 라우터를 만드는게낭르까
const express = require('express');
const memberController = require('../controllers/memberController');
const errorController = require('../controllers/errorController');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const passport = require('passport');
const member = require('../models/member');
const router = express.Router();

router.get("/test", (req, res)=>{
  res.render("testCheckMemberId");
})
router.get("/duplicateCheck", memberController.checkMemberId);
router.get("/signup", isNotLoggedIn, memberController.showSignupPage);
router.post("/signup", isNotLoggedIn, memberController.createMember);
router.get("/login", isNotLoggedIn, memberController.login);
//로그인 리디렉션 실패 231201
// router.post("/login", isNotLoggedIn, (
//   passport.authenticate("local", {
//     failureRedirect: "/auth/login"},
//     // successRedirect: "/"//req.session.previousUrl || "/",
//     (req,res)=>{
//       // function savePreviousUrl(req, res, next) {
//       //   if (!req.isAuthenticated()) {
//       //     req.session.previousUrl = req.originalUrl;
//       //   }
//       //   next();
//       // }
//       console.log(`hihi`);
//       res.redirect(`/`); //${previousUrl}
//       // const redirectTo = req.session.previousUrl || "/";
//       // delete req.session.previousUrl;
//       // res.redirect(decodeURIComponent(req.pre));
//   })
// ));
router.post("/login", isNotLoggedIn, (req, res) => {
  // req.session.previousUrl 
  // console.log('query value', req.query.prevUrl);
  // console.log(req.body.previous_url, '이전주소');
  
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/login"); // 인증 실패 시 로그인 페이지로 리다이렉트
    }
    return req.login(user, (loginError) => {// 성공적 인증되면 세션에 user 등록
      // const tmp = '/board';
      // console.log(req.body.previous_url, '이전주소2');
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return req.body.previous_url ? res.redirect(req.body.previous_url) : res.redirect('/');
      // return tmp ? res.redirect(tmp) : res.redirect('/gather');
    });
  })(req, res);
});


router.get("/logout", isLoggedIn, memberController.logout);
router.get("/findId", isNotLoggedIn, memberController.showFindIdPage);
router.post("/findId", isNotLoggedIn, memberController.showFoundId);
router.get("/findPw", isNotLoggedIn, memberController.showFindPwPage);
router.post("/findPw", isNotLoggedIn, memberController.findPw, memberController.sendPw);
// router.get("/send", memberController.sendPW);
// router.get("/find", memberController.findPW);
router.get("/changePw", isLoggedIn, memberController.showChangePwPage);
router.post("/changePw", isLoggedIn, memberController.changePw);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

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