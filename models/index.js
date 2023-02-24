const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAlias: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require('./category')(sequelize, Sequelize);
db.quizzes = require('./quiz')(sequelize, Sequelize);

db.quizzes.belongsTo(db.categories, {
    primaryKey: 'id',
    as: 'category'
})

// db.quizzes.belongsTo(db.categories , {foreignKey: 'categoryId', as: 'category'});
// db.categories.hasMany(db.quizzes,);

module.exports =db;