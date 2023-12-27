require('dotenv').config();

let host = process.env.DB_HOST;
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let database = process.env.DB_DATABASE;
let port = process.env.DB_PORT;

const development = {
  "username": user,
  "password": password,
  "database": database,
  "host": host,
  "dialect": "mysql",
  "port": port,
  // "timezone": "+00:00"
  "timezone": "+09:00",
  "charset": 'utf8mb4',
  "collation": 'utf8mb4_unicode_ci',
};

const test = {
  "username": user,
  "password": password, 
  "database": database,
  "host": host,
  "dialect": "mysql",
  "port": port,
  // "timezone": "+00:00"
  "timezone": "+09:00",
  "charset": 'utf8mb4',
  "collation": 'utf8mb4_unicode_ci',
};

const production = {
  "username": user,
  "password": password,
  "database": database,
  "host": host,
  "dialect": "mysql",
  "port": port,
  // "timezone": "+00:00"
  "timezone": "+09:00",
  "charset": 'utf8mb4',
  "collation": 'utf8mb4_unicode_ci',
};


module.exports = { development, production, test };