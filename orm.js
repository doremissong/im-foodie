const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];  // .json -> .js

const SequelizeAuto = require('sequelize-auto');
const auto =  new SequelizeAuto(config.database, config.username, config.password,{
    host: config.host,
    port: config.port,
    dialect: config.dialect
});

auto.run((err)=>{
    if(err) throw err;
})