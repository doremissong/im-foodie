const { db, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const notice = require("../models/notice");

module.exports = {
    showMainPage: (req, res)=>{
        const obj = {};
        // 여기도 
        const isAdmin = res.locals.result;
        if(!isAdmin.success && req.user){
            obj.user = req.user
        } else if(isAdmin.success && req.user) {
                obj.user = req.user;
                obj.admin = req.user;
        }
        // if(req.operator){
            // 관리자 로그인 되어 있으면
            // try{
                obj.pagination = res.locals.paginationInfo;
                obj.dataList = res.locals.dataList;
                // console.log(`[TEST] SHOWMAINPAGE`, obj);
                // obj.operator = req.operator;
                res.render('notice/notice', obj);
            // } catch (err){
            //     console.log(`[ERROR] showMainPage check getPaginationInfo ${err}`);
            //     res.redirect('/');
            // }
        // }
    },
    showWritePage: (req, res)=>{
        // 관리자 확인
        const obj = {};
        const isAdmin = res.locals.result;
        if(!isAdmin.success){
            res.send(`<script>alert('${isAdmin.message}'); window.location.href="/notice";</script>`);
            console.log(`[USER] ${req.user.mem_id} - `, isAdmin.message);
            // res.send('<script>alert("기존 비밀번호로는 변경하실 수 없습니다."); window.location.href="' + curUrl + '";</script>');
        } else {
            if (req.user) { // admin
                obj.user = req.user;
                obj.admin = req.user;
            }
            console.log(`[ADMIN] ${req.user.mem_id} - `, isAdmin.message);
            try {
                // obj.noticeId = req.query.ntc_no;
                res.render('notice/noticeWrite', obj);
            } catch (err) {
                res.redirect('/notice');
                console.log(`[Error]: showWritePage - notice`, err);
            }
        }
    },

    showUpdatePage: async (req, res)=>{
        // 관리자 확인 
        // title, content, priority (3) 수정가능
        const obj = {};
        var temp = {};
        const isAdmin = res.locals.result;
        // 관리자 체크
        if(!isAdmin.success){
            res.send(`<script>alert('${result.message}'); window.location.href="/notice";</script>`);
            console.log(`[USER] ${req.user.mem_id} - `, result.message);
            // res.send('<script>alert("기존 비밀번호로는 변경하실 수 없습니다."); window.location.href="' + curUrl + '";</script>');
        } else {
            if (req.user) { // admin
                obj.user = req.user;
                obj.admin = req.user;
            }
            console.log(`[ADMIN] ${req.user.mem_id} - `, isAdmin.message);
            try {
                const notice_id = req.query.ntc_no;
                await sequelize.transaction(async t => {
                    temp = await db.notice.findOne({
                        attributes: ['notice_id', 'title', 'content', 'priority'],
                        where: { notice_id: notice_id }
                    })
                })
                obj.dataList = temp.dataValues;
                console.log(obj.dataList, '값확인');
                res.render('notice/noticeUpdate', obj);
            } catch (err) {
                res.redirect('/notice');
                console.log(`[Error]: showUpdatePage - notice`, err);
            }
        }res.locals.result
    },

    showNotice: async(req, res)=>{
        if (req.query.ntc_no){
            const noticeId = req.query.ntc_no;
            const obj = {};
            
            const isAdmin = res.locals.result;
            if(req.user && isAdmin.success){    //관리자면
                obj.admin = req.user;
                obj.user = req.user;
            } else if(req.user && !isAdmin.success){    // 일반 유저면
                obj.user = req.user;
            }
            console.log(obj, 'here');

            // 글 정보 가져오기
            try{
                await sequelize.transaction(async t=>{
                    await db.notice.update(
                        { viewCount: sequelize.literal('viewCount+1')},
                        {
                            where: { notice_id: noticeId},
                            transaction: t
                        }
                    )
                })

                obj.dataList = await db.notice.findOne({
                    // attributes : [], 관리자 id 빼고, 제목, 내용, 시간, 
                    where: { notice_id: noticeId }});
                console.log(`showNotice컨트롤러:`, obj);
                res.render('notice/noticeView', obj);
            } catch (err){
                console.log(`[ERROR] select a notice - showNotice`);
                res.redirect('/notice', );
            }
        } else{
            console.log(`[ERROR] notice number wasn't sent. - showNotice`);
            res.redirect('/notice');
        }
    },

    createNotice: async(req, res)=>{
        // post로 받음. //title, content, priority viewCount 입력스, 이외는 자동
        const isAdmin = res.locals.result;
        if (!isAdmin.success) {
            res.send(`<script>alert('${isAdmin.message}'); window.location.href="/notice";</script>`);
            console.log(`[USER] ${req.user.mem_id} - `, isAdmin.message);
            // res.send('<script>alert("기존 비밀번호로는 변경하실 수 없습니다."); window.location.href="' + curUrl + '";</script>');
        } else if(isAdmin.success && req.user){
            if (!req.body) {
                console.log(`[ERROR] Req.params are not sent. - createNotice`);
                res.redirect('/notice');
            }
            // 값 전달 잘 되면
            const noticeData = {
                title: req.body.title,
                content: req.body.content,
                priority: req.body.priority,
                viewCount: 0,
                operator_id: req.user.mem_id
            }
            console.log(`createNotice- noticeData test: ${noticeData.content}`);
            try {
                var data = {};
                await sequelize.transaction(async t => {
                    data = await db.notice.create(noticeData, { transaction: t });
                })
                console.log(`createNotice- data by ${req.user.mem_id}: ${data}`);
                res.redirect(`/notice/view?ntc_no=${data.notice_id}`);
            } catch (err) {
                console.log(`[ERROR] while creating notice - createNotice`, err);
                res.redirect('/notice');
            }
        } else{
            console.log('[ERROR] 잘못된 접근입니다. createNotice');
            res.redirect('/notice');
        }
    },

    updateNotice: async(req, res)=>{
        // post로 받음. //title, content, priority (3) 수정
        console.log('[updateNotice]');
        const isAdmin = res.locals.result;
        if (!isAdmin.success) {
            res.send(`<script>alert('${isAdmin.message}'); window.location.href="/notice";</script>`);
            console.log(`[USER] ${req.user.mem_id} - `, isAdmin.message);
            // res.send('<script>alert("기존 비밀번호로는 변경하실 수 없습니다."); window.location.href="' + curUrl + '";</script>');
        } else if(isAdmin.success && req.user){
            if (req.query.ntc_no && req.params) {
                // 값 전달 잘 되면
                const noticeId = req.query.ntc_no;
                console.log('쿼리 공지글번호 CHECK', noticeId);
                const noticeData = {
                    title: req.body.title,
                    content: req.body.content,
                    priority: req.body.priority,
                }
                try {
                    var data = {};
                    await sequelize.transaction(async t => {
                        data = await db.notice.update(noticeData, {
                            where: { notice_id: noticeId },
                            transaction: t
                        });
                    })
                    console.log(`updateNotice- data by ${req.user.mem_id}:`, data);
                    res.redirect(`/notice/view?ntc_no=${noticeId}`);
                } catch (err) {
                    console.log(`[ERROR] while creating notice - updateNotice`, err);
                    res.redirect('/notice');
                }
            } else {
                console.log(`[ERROR] Req.params are not sent. - updateNotice`);
                res.redirect('/notice');
            }
        } else{
            console.log('[ERROR] 잘못된 접근입니다. updateNotice');
            res.redirect('/notice');
        }
    },
                                             
    deleteNotice: async(req, res)=>{
        // query에 글 id있어
        const isAdmin = res.locals.result;
        if (!isAdmin.success) {
            res.send(`<script>alert('${isAdmin.message}'); window.location.href="/notice";</script>`);
            console.log(`[USER] ${req.user.mem_id} - `, isAdmin.message);
            // res.send('<script>alert("기존 비밀번호로는 변경하실 수 없습니다."); window.location.href="' + curUrl + '";</script>');
        } else if (isAdmin.success && req.user) {
            if (req.query.ntc_no && req.params) {
                try {
                    const noticeId = req.query.ntc_no;
                    await sequelize.transaction(async t => {
                        await db.notice.destroy({
                            where: { notice_id: noticeId }
                        });
                    });
                    console.log(`Delete notice(${noticeId}) by ${req.user.mem_id}`);
                    res.redirect("/notice");
                } catch (err) {
                    console.log(`[ERROR] Deleting notice:`, err);
                }
            } else {
                console.log(`[ERROR] Req.params are not sent. - deleteNotice`);
                res.redirect('/notice');
            }
        } else {
            console.log('[ERROR] 잘못된 접근입니다. deleteNotice');
            res.redirect('/notice');
        }
    },
}