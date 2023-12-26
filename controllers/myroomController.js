// myRoom Controller
const { db, sequelize } = require("../models/index");

module.exports={
    //
    showMainPage: (req, res)=>{
        const obj = {};
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }
        if(typeof req.user == 'undefined'&& !req.user){
            // res.write("<script>alert('로그인이 필요합니다.');</script>");
            res.redirect('/auth/login');
        } else{
            res.render('myroom/myroom', obj);
        }
    },
    // 1-a) 비번 변경 화면
    showChangePwPage: (req, res)=>{
        const obj = {};
        obj.curPage = 'changePw';
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }
        res.render('myroom/myroomCPW', obj);  
    },
    // 1-b) 프로필 수정
    showModifyPage: (req, res)=>{
        const obj = {};
        obj.curPage = 'modify';
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }
        res.render('myroom/myroomModify', obj);

    },
    // 1-c) 계정 탈퇴
    showWithdrawPage: (req, res)=>{
        const obj = {};
        obj.curPage = 'withdraw';
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }

        res.render('myroom/myroomWithdraw', obj);

    },
    // ✅1-d) 비밀번호 확인 화면
    showCheckPwPage: (req, res, next)=>{
        const obj = {};
        const url = req.url.split('/',2).join('');
        obj.curPage = url;
        // console.log(url, '확인', 'curPage확인', obj.curPage);
        if(!req.user){
            next(err);
        } else{
            var memId = req.user.mem_id;
            obj.user = req.user;
        }

        switch (url){
            case 'changePw':
                obj.phrase = '비밀번호 수정을 위해 비밀번호를 다시 한 번 입력해주세요❗';
                break;
            case 'modify':
                obj.phrase = '개인정보 수정을 위해 비밀번호를 다시 한 번 입력해주세요❗';
                break;
            case 'withdraw':
                obj.phrase = '회원 탈퇴를 위해 비밀번호를 다시 한 번 입력해주세요❗';
                break;
            default:
                obj.phrase = '비밀번호를 다시 한 번 입력해주세요';
                break;
        }
        // console.log(obj);
        res.locals.obj = obj;
        res.render('myroom/myroomCheckPw', obj);
    },


    // obj.curPage = 'boardPost';
    // obj.curPage = 'boardComment';
    // obj.curPage = 'boardLike';
    // obj.curPage = 'recipePost';
    // obj.curPage = 'recipeComment';
    // obj.curPage = 'recipeLike';

    // getCurrentUrl: (req, res, next)=>{
    //     console.log('오리지널 url', req.originalUrl);
    //     res.locals.redirect = req.originalUrl;
    //     // res.redirect(res.locals.redirect);
    // },

    
}