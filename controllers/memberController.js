//model - dealing with data
// view - show ui
// controller - interface between model, view

const db = require('../models');

module.exports = {

    saveUser: (req, res)=>{
      res.render("index");  
    },
    //create
    // saveUser: async (req, res) => {
    //     if (req.body.mem_id && req.body.password){
    //         const { mem_id, password,
    //             name,
    //             email,
    //             tel,
    //             address,
    //             birthdate,
    //             profile_image,
    //             tos_flag,
    //             pip_flag,
    //             notification_flag } = req.body;
    //         console.log(req.body);
                
    //         await db.member.create({
    //             mem_sq:2,
    //             mem_id:mem_id,
    //             password:password,
    //             name:name,
    //             email:email,
    //             tel:tel,
    //             address:address,
    //             birthdate:birthdate,
    //             profile_image:profile_image,
    //             tos_flag:tos_flag,
    //             pip_flag:pip_flag,
    //             notification_flag:notification_flag
    //         });

    //         res.render('member', {mem_id});
    //     } else{
    //         res.send('Not added to the database!');
    //     }
    // },
    getSignUpPage: (req, res)=>{
        res.render("signUp");
    },
    
    getLoginPage: (req,res)=>{
        res.render("login"); 
        // login.ejs is not ready.
    }
}

