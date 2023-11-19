const { db, sequelize } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
    showMainPage: (req, res)=>{
        // if(req.operator){
            // 관리자 로그인 되어 있으면
            // try{
                const obj = {};
                obj.pagination = res.locals.paginationInfo;
                obj.dataList = res.locals.dataList;
                // console.log(`[TEST] SHOWMAINPAGE`, obj);
                // obj.operator = req.operator;
                res.render('noticeList', obj);
            // } catch (err){
            //     console.log(`[ERROR] showMainPage check getPaginationInfo ${err}`);
            //     res.redirect('/');
            // }
        // }
    },
    showWritePage: (req, res)=>{
        try{
            const obj = {};
            obj.noticeId = req.query.ntc_no;
            // obj.operator_id = req.operator.id;
            res.render('noticeWrite', obj);
        } catch (err) {
            res.redirect('/notice');
            console.log(`[Error]: There's no ntc_no in url - showWritePage - notice`, err);
        }
    },

    showUpdatePage: async (req, res)=>{
        // title, content, priority (3) 수정가능
        if(req.query.ntc_no){
            const obj = {};
            var temp = {};
            const notice_id = req.query.ntc_no;
            try{
                await sequelize.transaction(async t =>{
                    temp = await db.notice.findOne({
                        attributes: ['notice_id', 'title', 'content', 'priority'],
                        where: { notice_id: notice_id }
                    })
                })
                obj.dataList = temp.dataValues;
                console.log(obj.dataList, '값확인');
            } catch(err) {
                console.log(`[Error] cannot get notice data from DB - showUpdatePage. - notice`, err);
                res.redirect('/notice');
            }

            // 관리자 아이디 obj에 너허어
            // obj.operator_id = req.operator.id;
            res.render('noticeUpdate', obj);
        } else{
            res.redirect('/notice');
            console.log(`[Error]: There's no ntc_no in url - showUpdatePage`);
        }
    },

    showNotice: async(req, res)=>{
        if (req.query.ntc_no){
            const noticeId = req.query.ntc_no;
            const obj = {};
            //관리자 잇으면
            /* if(req.operator){
                obj.operator = req.operator;
            } */
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
            } catch(err){
                console.log('[ERROR] while updating viewCount -showNotice', err);
                res.redirect('/notice');
            }
            try{
                obj.dataList = await db.notice.findOne({
                    // attributes : [], 관리자 id 빼고, 제목, 내용, 시간, 
                    where: { notice_id: noticeId }});
                console.log(`showNotice컨트롤러:`, obj.dataList);
                res.render('noticeView', obj);
            } catch (err){
                console.log(`[ERROR] select a notice - showNotice`);
                res.redirect('/notice', );
            }
        } else{
            console.log(`[ERROR] notice number wasn't sent. - showNotice`);
            // res.redirect('/notice');
        }
    },

    createNotice: async(req, res)=>{
        // post로 받음. //title, content, priority viewCount 입력스, 이외는 자동
        if(!req.body){
            console.log(`[ERROR] Req.params are not sent. - createNotice`);
            res.redirect('/notice');
        }
        // 값 전달 잘 되면
        const obj = {
            title: req.body.title,
            content: req.body.content,
            priority: req.body.priority,
            viewCount: 0,
            operator_id: 'admin'
        }
        console.log(`createNotice- obj test: ${obj.content}`);
        try {
            var data ={};
            await sequelize.transaction(async t => {
                data = await db.notice.create(obj, { transaction: t });
            })
            console.log(`createNotice- data test: ${data}`);
            res.redirect(`/notice/view?ntc_no=${data.notice_id}`);
        } catch (err) {
            console.log(`[ERROR] while creating notice - createNotice`, err);
            res.redirect('/notice');
        }

    },

    updateNotice: async(req, res)=>{
        // post로 받음. //title, content, priority (3) 수정
        console.log('업데이트 시도 시작?');
        if(req.query.ntc_no && req.params){
            // 값 전달 잘 되면
            const noticeId = req.query.ntc_no;
            console.log('쿼리 공지글번호 호가인', noticeId);
            const obj = {
                title: req.body.title,
                content: req.body.content,
                priority: req.body.priority,
            }
            try {
                var data = {};
                await sequelize.transaction(async t => {
                    data = await db.notice.update(obj, {
                        where: { notice_id: noticeId },
                        transaction: t
                    });
                })
                console.log(`updateNotice- data test:`, data);
                res.redirect(`/notice/view?ntc_no=${noticeId}`);
            } catch (err) {
                console.log(`[ERROR] while creating notice - updateNotice`, err);
                res.redirect('/notice');
            }
        } else{
            console.log(`[ERROR] Req.params are not sent. - updateNotice`);
            res.redirect('/notice');
        }
    },
                                             
    deleteNotice: async(req, res)=>{
        // query에 글 id있어
        const noticeId = req.query.ntc_no;
        try{
            await sequelize.transaction(async t=>{
                await db.notice.destroy({
                    where: {notice_id: noticeId}
                });
            });
            res.redirect("/notice");
        } catch (err){
            console.log(`[ERROR] Deleting notice:`, err);
        }
    },
}