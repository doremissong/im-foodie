const passport = require("passport"); // 사용자 컨트롤러 제일 위. 371쪽
require('dotenv').config();
const { db, sequelize } = require('../models/index');
const Op = sequelize.Op;
const path = require('path');
const bcrypt = require('bcryptjs');
const { isEmpty, redirect } = require('../routes/middlewares');
const transporter = require('../config/email');
const ISCREATING = 0, ISMODIFYING =1;

// __dirname === C:\Users\zelly\Desktop\imfoodie\im-foodie\controllers

// 디비 연결
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// 모델 동기화
sequelize.sync({ force: false })
    .then(() => {
        console.log('model synchronization success');
    })
    .catch((err) => {
        console.error(err);
    });

hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);
    return hashedPW;
}

getMemberParams = async (body, isModifying) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(body.password, salt);
    var result = {};
    if(!isModifying){    // 생성
        const hashedPassword = await hashPassword(body.password);
        result =  {
            mem_id: body.mem_id,
            password: hashedPassword,
            name: body.name,
            email: body.email,  //email 양식 확인. naver.coim 이렇게 하면 안되니까
            tel: body.tel,
            address: body.address,
            birthdate: body.birthdate,
            profile_image: body.profile_image,
            state: 1, // state는 뭐지??????
            tos_flag: body.tos_flag,
            pip_flag: body.pip_flag,
            notification_flag: body.notification_flag
        }
    } else{
        result = {
            email: body.email,
            tel: body.tel,
            city: body.city,
            district: body.district,
            neighborhood: body.neighborhood,
            birthdate: body.birthdate,
            profile_image: body.profile_image,
        }
    }
    return result;
}


generateRandomPassword = ()=>{
    // const randomPassword = Math.random().toString(36).slice(2);
    return Math.random().toString(36).slice(2);
}

//   https://sanghaklee.tistory.com/3

module.exports = {
    // 통계용. 
    // app.get("/members", memberController.index, memberController.indexView);
    
    show: async (req, res, next) => {
        try{
            console.log("loading members");
            // const allMembers = await db.member.findAll();
            // res.locals.members = allMembers; //아님 members?  아래로 한번에 하는 게 낫지 않나?
            res.locals.members = await db.member.findAll({limit:5});
            next();
        } catch (err) {

            console.log(`Error selecting all members : ${err.message}`);
            next(err);
        }
    },

    // showView & indexView are totally same
    showView: (req,res)=>{
        const members = res.locals.members;
        res.json(members);
        // res.send('all members');
    },
    indexView: (req,res)=>{
        const member = res.locals.members;
        res.json(member);
        //수정
    },
    
    //index가 쿼리를 완료하고 res 객체에 데이터 보내면 indexView는 뷰 렌더링
    index: async (req, res, next)=>{
        let memId = req.body.mem_id;
        try {
            // mem = await db.member.findAll({where: {mem_id: memId}});
            // res.locals.members = mem;        // 마찬가지로 아래로 하나로 하는 거 어때?
            res.locals.members = await db.member.findAll({where: {mem_id: memId}});
            next();
        } catch(err){
            console.log(`Error fetching member by ID: ${err.message}`);
            next(err);
        }
    },

    showSignupPage: (req, res) => {
        res.render("member/signUp");
        // res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    },

    createMember: async (req, res) => {
        //const { mem_id, password, name, email, tel, address, birthdate, profile_image, tos_flag, pip_flag, notification_flag } = req.body;
        if(req.skip) next();    // create액션 건너뛰고 바ㅗ 뷰로 되돌아감

        var memberData = await getMemberParams(req.body, ISCREATING);
        console.log(memberData);

        try {
           await sequelize.transaction(async t => {
                const memberExist = await db.member.findOne({where: {mem_id:memberData.mem_id}});
                console.log("member: ", isEmpty(memberExist));
                if (memberData.mem_id && memberData.password && isEmpty(memberExist)) {
                    await db.member.create(memberData, { transaction: t });
                    res.locals.redirect = "/";
                    res.redirect("/");
                    // res.render(path.join(__dirname,'../views/member'), { mem_id : memberData.mem_id });
                } else {
                    res.redirect("/auth/signup");
                    console.log('ID is already used.');
                    // res.render(path.join(__dirname, '../views/thanks'));
                    // 먼저 id, email 중복 체크
                }
           })
        } catch (err) {

            console.log(`Error saving user: ${err.message}`);
            console.log(err);
            //req.flash("error", `Failed to create member account because: ${err.message}`);
            // console.log('error'); //이렇게 하면 당장 내가 얻을 수 있는 정보는 없음.
        }
    },

    login: (req,res)=>{
        res.render("member/login");
        // res.sendFile(path.join(__dirname, "../public/html/login.html"));
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();    //그러면 없으면 에러 나는 거 아니야?
    },
    logout: (req, res) => {
        console.log('[Before logout]: ', req.user);
        // req.session.save((err) => {   //save 전에 destroy(); 
        //     res.redirect('/');      //save는 session store에 저장
        // });
        req.logout(function (err) {
            if (err) { console.log(err); }
            console.log('[After logout]');
            res.redirect('/');
            // redirect(req,res);
        });
    },

    // // 화면 변경 화면 보여주기
    // //     //memId는 session이나 로그인 정보에서 가져와야한다.
    // edit: (req,res)=>{
    //     //여기서 데이터 불러와서 브라우저에 띄워줘야함
    //     res.sendFile(path.join(__dirname, "../public/html/myroom/edit.html"));
    // },

    updateMemberInfo: async (req, res)=>{
        const memId = req.user.mem_id;
        var updatedMemberData = await getMemberParams(req.body, ISMODIFYING);
        // res.send(updatedMemberData);
        // console.log(updatedMemberData);
        //✅멤버 조회해서 보여줄 때, 저장해야함.
        try {
            await sequelize.transaction(async t => {
                await db.member.update(updatedMemberData, {
                    where: {mem_id: memId},
                    transaction: t
                })
            });
            res.redirect('/myroom');
        } catch (err) {
            console.log(`Error updating member: ${err.message}`);
            res.redirect(req.originalUrl); // /myroom/modify
        }
    },


    //삭제? 또는 이름 바꾸기
    // showDelete: (req, res)=>{
    //     res.sendFile(path.join(__dirname, "../public/html/delete.html"));
    // },

    deleteMember: async(req, res, next)=>{
        var memId = req.body.mem_id;
        try{
            sequelize.transaction(async t => {
                await db.member.destroy({
                    where : {mem_id:memId},
                    transaction: t,
                });
                next();
            })
        } catch (err) {
            console.log(`Error deleting member: ${err.message}`);
            next(err);
        }
    },

    showFindIdPage: (req, res)=>{
        res.render("member/findId");
        // res.sendFile(path.join(__dirname, "../public/html/find-id.html"));
    },

    showFoundId: async(req, res)=>{
        // req에서 이름 + 휴대폰 번호 / 이름 + 이메일 받아서
        var {name, email} = req.body;
        console.log(req.body);
        // // 어떻게 하지? input 태그 라디오 태그에 담아서 올 수 있나?
        // // hidden으로 하면 할 수 있을 거 같은데
        // // if(type==="tel"){
        const foundId = await db.member.findOne({
            attributes: ['mem_id'],
            where: { name: name, email: email }
        });
        // res.send(foundId.mem_id);
        res.render("member/showId", {mem_id: foundId.mem_id});
        // }
    },

    showFindPwPage: (req, res)=>{
        res.render("member/findPw");
        // res.sendFile(path.join(__dirname, "../public/html/find-pw.html"));
    },

    findPw: async (req, res, next)=>{
        var {mem_id, name, email} = req.body;
        await db.member.findOne({
            where: {mem_id: mem_id, name: name, email: email}
        })
        .then(async()=>{ 
            // 비번 변경 + state를 비번 바꾸게 설정
            const newPassword = generateRandomPassword();
            const hashedPassword = await hashPassword(newPassword);
            try {
                await sequelize.transaction(async t => {
                    await db.member.update(
                        { password: hashedPassword, state: process.env.UPDATE_REQUIRED },
                        {
                            where: {
                                mem_id: mem_id
                            },
                            transaction: t
                        });
                })
            } catch (err) {
                console.log(`Error updating pw while find pw: ${err.message}`);
            }
            //💚얘네를 try 안에 넣어야할까? 여기다 둬야할까?
            res.locals.member_info = {
                password: newPassword,
                email: email
            };
            next();
        })
        .catch((err)=>{
            next(err);
        })
    },

    sendPw: (req, res)=>{
        const eamilOptions = {
            from: "I'm Foodie",
            to: "zelly1020@naver.com",
            //to: res.locals.member_info.email, //locals.email,
            subject: "[I'm Foodie] 비밀번호 찾기",
            text: "안녕하세요 아임푸디입니다.\n 변경된 비밀번호는 다음과 같습니다.\n" 
            + res.locals.member_info.password + "\n개인정보 보호를 위해 반드시 비밀번호를 변경해주세요 🍽️"
        }

        transporter.sendMail(eamilOptions, (err, res)=>{
            if(err){
                console.log(`[Error]: while sending email about pw ${err.message}`);
            }
        })
        // res.send('Success!');
        res.write("<script>alert('success')</script>");
        res.redirect("/auth/changePw");
    },

    showChangePwPage: (req, res)=>{
        //❗‼변경 페이지 받기
        res.render("member/changePw", {user: req.user});
    },

    changePw: async(req, res)=>{
        const newPw = req.body.new_pw;
        const confPw = req.body.conf_pw;
        const curUrl = req.originalUrl;
        const isUsed = await bcrypt.compare(newPw, req.user.password);
        // console.log('새로운 비번:', newPw, '새 비번 재확인: ', confPw, '비교결과:',isUsed, '리디렉션:', curUrl);
        if (isUsed){
            res.send('<script>alert("기존 비밀번호로는 변경하실 수 없습니다."); window.location.href="' + curUrl + '";</script>');
        } else if(newPw != confPw) {
            // res.write('<script>alert("다른 비밀번호를 입력해주세요.");</script>');
            // res.redirect(curUrl);
            res.send('<script>alert("새 비밀번호와 재입력한 비밀번호가 다릅니다. 다시 확인해주세요."); window.location.href="' + curUrl + '";</script>');
                                                                                                                            // 그냥 curUrl만 하면 안되나?
        } else{
            const hashedPassword = await hashPassword(req.body.new_pw);
            console.log(hashedPassword, '해쉬한 새 비번');
            // // 팝업창 띄우기 
            try {
                await sequelize.transaction(async t => {
                    await db.member.update(
                        { password: hashedPassword, state: process.env.NORMAL },
                        {
                            where: { mem_id: req.user.mem_id },
                            transaction: t
                        })
                })
            } catch (err) {
                console.log(`Error updating pw: ${err.message}`);
            }
            res.send('<script>alert("홈화면으로 이동합니다."); window.location.href="' + curUrl + '";</script>');
        }
    },

    // 테스트
    checkMemberId: async(req, res)=>{
        if(!req.query.memId){
            res.json({success: false, message: '다시 시도해주세요'})
        }

        const reservedId = ['admin', 'imfoodie']; //*admin*, imfoodie*;
        const _memId = req.query.memId;
        var isPassed = true;
        var isUsable = true;
        console.log('통과?',isPassed); 
        console.log('[checkMemberId] memId', _memId);
        console.log('[checkMemberId] 도착', req.originalUrl);
        try{
            const result = await db.member.findOne({
                attributes: ['mem_id'],
                where: {
                    mem_id: _memId
                },
                raw: true
            });
            // console.log('memberCtrl- checkMemberId', result);
            if (result && result.mem_id == _memId) {
                isUsable = false;
                // res.json({ success: false, message: '사용할 수 없는 아이디입니다..' });
            }

            if (isUsable) {
                for (let i = 0; i < reservedId.length; i++) {
                    if (_memId.includes(reservedId[i])) {
                        return res.json({ success: false, message: '사용할 수 없는 아이디입니다.' });
                        return;
                    }
                }
    
                // Continue with the logic after the database query
                res.json({ success: true, message: '사용 가능한 아이디입니다.' });
            } else {
                res.json({ success: false, message: '사용할 수 없는 아이디입니다.' });
            }
            console.log('isUsable:', isUsable);
        } catch (err) {
            // res.json({success:false, message: '다시 시도해주세요'});
            console.log('[ERROR] while checking if entered Id is already used.', err);
        // res.redirect('/');
        }
    }
    // 이게 될까ㅛ?
    // validate: (req, res, next)=>{
    //     req.santizeBody("email").normalizeEmail({
    //         all_lowercase: true
    //     }).trim();  // 다 소문자로, whitespace 공백 제거
    //     req.check("email", "Email is invalid.").isEmail();
    //     req.check("zipCode", "Zip code is invalid.")
    //     .notEmpty().isInt().isLength({
    //         min:5,
    //         max:5
    //     }).equals(req.body.zipCode);
    //     // 왜 우편번호만 equals들어가?그리고 나머지는 왜 req의 ㄱ밧이랑 비교 안해?
    //     req.check("password", "Password cannot be empty.").notEmpty();

    //     // 유효성 결과 수집
    //     req.getValidationResult.then((err)=>{
    //         if(!err.isEmpty()){
    //             let messages = err.array().map(e=>e.msg);
    //             req.skip = true;
    //             res.locals.redirect= "auth/signup";
    //             next();
    //         } else{
    //             next();
    //         }
    //     });
    // },
}
