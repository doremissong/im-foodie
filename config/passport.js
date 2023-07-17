// passport.js
const LocalStrategy = require('passport-local').Strategy;
const { db } = require('../models/index');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {

    passport.serializeUser((member, done)=>{
        console.log('[serialize2] ', member.mem_id);
        done(null, member.mem_id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log('[deserialize2] ', id);
        await db.member.findOne({where: { mem_id: id}})
        .then((mem)=>{
            console.log('[check member deserialize2] ', mem.mem_id);
            done(null, mem);
        })
        .catch((err)=>done(err, id));
    })

    passport.use(new LocalStrategy({
        usernameField: 'mem_id',
        passwordField: 'password'
    }, async (mem_id, password, done) => {
        // console.log(`[ID]: ${mem_id}\n[Password]: ${password}`);
        // try {
            var member = await db.member.findOne({ where: { mem_id: mem_id} });
            if (!(member)){
                console.log('ID not found');
                return done(null, false, { message: 'ID not found' });// if user was not found, return false for member and pass an err message
            }
            // console.log("[db에서 가져온 PASSWORD]: ", member.password);
            // console.log("[입력받은 pw]: ", password);
            var result = await bcrypt.compare(password, member.password)// compareSync로 return 값이 boolean인듯함
            // // var result=member.password===password;
            // console.log("비밀번호 일치여부: ",result);
            if (result) {   // if match return user
                console.log('Login success..!', member.mem_id);
                return done(null, member); 
            } else {
                console.log('Incorrect password.');
                return done(null, false, { message: 'Incorrect password.' });   // { message: 'Incorrect username or password.' }
            }
        // }
        // catch (err) {
        //     console.log(err);
        //     console.log(`Error authenticating strategy: ${err}`);
        // }
    }));

    return passport; // 함수 호출될 때 passport를 외부 반환해줌
}
