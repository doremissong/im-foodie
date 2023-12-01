const passport = require("passport"); // 사용자 컨트롤러 제일 위. 371쪽
require('dotenv').config();
const { db, sequelize } = require('../models/index');
const Op = sequelize.Op;
const path = require('path');
const bcrypt = require('bcryptjs');
const { isEmpty, redirect } = require('../routes/middlewares');
const transporter = require('../config/email');

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
getMemberParams = async (body) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(body.password, salt);
    const hashedPassword = await hashPassword(body.password);
    return {
        mem_id: body.mem_id,
        password: hashedPassword,
        name: body.name,
        email: body.email,  //email 양식 확인. naver.coim 이렇게 하면 안되니까
        tel: body.tel,
        address: body.address,
        birthdate: body.birthdate,
        profile_image: body.profile_image,
        state: 1, //
        tos_flag: body.tos_flag,
        pip_flag: body.pip_flag,
        notification_flag: body.notification_flag
    }
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
        res.render("signUp");
        // res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    },

    createMember: async (req, res) => {
        //const { mem_id, password, name, email, tel, address, birthdate, profile_image, tos_flag, pip_flag, notification_flag } = req.body;
        if(req.skip) next();    // create액션 건너뛰고 바ㅗ 뷰로 되돌아감

        var memberData = await getMemberParams(req.body);
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
        res.render("login");
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

    // 화면 변경 화면 보여주기
    //     //memId는 session이나 로그인 정보에서 가져와야한다.
    edit: (req,res)=>{
        //여기서 데이터 불러와서 브라우저에 띄워줘야함
        res.sendFile(path.join(__dirname, "../public/html/myroom/edit.html"));
    },

    // 값 수정. 정보 다 보여주지 말고. email, 전화번호, 이름, 이런 것만 변경하게.
    //                              시간 같은 거, 약관동의 같은 거 빼고. 그러면 뷰를 만들어야하나
    update: async (req, res, next)=>{
        // update_date는 알아서 됨?????
        var memId = req.body.mem_id;
        var updatedMemberData = getMemberParams(req.body);
        //✅멤버 조회해서 보여줄 때, 저장해야함.
        res.locals.members = memId; 

        try {
            await sequelize.transaction(async t => {
                await db.member.update(updatedMemberData, {
                    where: {mem_id: memId},
                    transaction: t
                })
            });
            next();
        } catch (err) {
            console.log(`Error updating member: ${err.message}`);
            next(err);
        }
    },

    updateView: (req, res)=>{
        res.send("update is complete");
    },

    //삭제? 또는 이름 바꾸기
    showDelete: (req, res)=>{
        res.sendFile(path.join(__dirname, "../public/html/delete.html"));
    },

    delete: async(req, res, next)=>{
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
        res.render("findId");
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
        res.render("showId", {mem_id: foundId.mem_id});
        // }
    },

    showFindPwPage: (req, res)=>{
        res.render("findPw");
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
        res.render("changePw", {user: req.user});
    },

    changePw: async(req, res)=>{
        const oldPassword = req.body.old_password;
        const hashedPassword = await hashPassword(req.body.new_password);
        const result = await bcrypt.compare(oldPassword, req.user.password);
        if (result) {
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
            res.redirect("/");
            //res.redirect(res.locals.history);
            // res.send(req.body.newPassword);
        } else{
            // 팝업창 띄우기 
            res.redirect("/auth/changePw");
        }
    },
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
