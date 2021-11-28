const dbConfig = require('../config/db.config');


const Sequalize = require('sequelize');

const sequelize = new Sequalize(
    dbConfig.SCHEMA, 
    dbConfig.USER, 
    dbConfig.PASS, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: {
      ssl : dbConfig.DB_SSL == 'true'  
    },
    operaterAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequalize = Sequalize;
db.sequelize = sequelize;

module.exports = db;