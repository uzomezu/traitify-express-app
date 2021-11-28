const db = require('./index');
const User = require('./user.model')
const Assessment = db.sequelize.define("assessment", {
        uuid: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        isComplete: {
            type: db.Sequelize.BOOLEAN,
            allowNull : false,
            defaultValue : false
        }
});


module.exports = Assessment;
