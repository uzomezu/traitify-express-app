const db = require('./index');
const Assessment = require('./assessment.model');



const User = db.sequelize.define('user', {
        email: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        password : {
            type: db.Sequelize.STRING,
            allowNull: false
        },
    });
    
// creastes one to many relation of assessment id's
User.hasMany(Assessment, {
    foreignKey : "assessmentId"
})
Assessment.belongsTo(User);

module.exports = User;
