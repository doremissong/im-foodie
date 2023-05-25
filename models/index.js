'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
//config/config.js에서 설정값 가져옴. DB설정 가져옴
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];  // .json -> .js

const initModels = require('./init-models'); //init-models.js에서 메서드 가져옴.
// const { Sequelize } = require('sequelize');

// new Sequelize를 통해 MySQL 연결 객체 생성.
const sequelize = new Sequelize(config.database, config.username, config.password,{
  host: config.host,
  dialect: config.dialect,
  timezone: config.timezone,
  //connection pool -https://sequelize.org/docs/v6/other-topics/connection-pool/
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// 모델과 테이블간의 관계 맺어짐.
//const models = initModels(sequelize);
const db = initModels(sequelize);

module.exports = { db, sequelize };

// const db = {};// 객체
// db.sequelize = sequelize; //객체 속성 추가
// db.Sequelize = Sequelize;
// db.models = {};
// db.models.Member = require('./member')(sequelize, Sequelize.DataTypes);

// module.exports = db;

/*
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
*/
