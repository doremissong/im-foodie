//model - dealing with data
// view - show ui
// controller - interface between model, view
const { db, sequelize } = require('../models/index');

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
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = {

    // saveUser: (req, res) => {
    //     res.send(req.body);
    // },
    // create

    saveUser: async (req, res) => {
        console.log(req.body);
        if (req.body.mem_id && req.body.password) {
            const { mem_id, password,
                name,
                email,
                tel,
                address,
                birthdate,
                profile_image,
                tos_flag,
                pip_flag,
                notification_flag } = req.body;
            try {
                await db.member.create({
                    mem_sq: 2,
                    mem_id: mem_id,
                    password: password,
                    name: name,
                    email: email,
                    tel: tel,
                    address: address,
                    birthdate: birthdate,
                    profile_image: profile_image,
                    state: 1, //
                    tos_flag: tos_flag,
                    pip_flag: pip_flag,
                    notification_flag: notification_flag
                });
            } catch (err) {
                console.log("why: " + err);
            }
            res.render('member', { mem_id });
        } else {
            res.send('Not added to the database!');
        }
    },

    getSignUpPage: (req, res) => {
        res.render("signUp");
    },

    getLoginPage: (req, res) => {
        res.render("login");
        // login.ejs is not ready.
    }
}

