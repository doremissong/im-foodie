require('dotenv').config();

let host = process.env.DB_HOST;
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let database = process.env.DB_DATABASE;

const development = {
  "username": user,
  "password": password,
  "database": database,
  "host": host,
  "dialect": "mysql",
  "port": "3306",
  "timezone": "+09:00"
};

const test = {
  "username": user,
  "password": password,
  "database": database,
  "host": host,
  "dialect": "mysql",
  "port": "3306",
  "timezone": "+09:00"
};

const production = {
  "username": user,
  "password": password,
  "database": database,
  "host": host,
  "dialect": "mysql",
  "port": "3306",
  "timezone": "+09:00"
};


module.exports = { development, production, test };