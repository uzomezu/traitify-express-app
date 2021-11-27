const dbConfig = require('../config/db.config');

const Sequalize = require('sequelize');
const sequelize = new Sequalize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
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