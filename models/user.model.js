const db = require('./index');
const Assessment = require('./assessment.model');
const bcrypt = require('bcryptjs');


const User = db.sequelize.define('user', {
        isAdmin: {
            type: db.Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password : {
            type: db.Sequelize.STRING,
            allowNull: false
        },
    });
    
// creastes one to many relation of assessment id's
User.hasMany(Assessment)
Assessment.belongsTo(User);

// Authentication

User.authenitcate = async function(identifier, password){
    var user;
    const checkEmail = await User.findOne({where: {
        email: identifier
    }});
    const checkUsername = await User.findOne({where: {
        username: identifier
    }});
    if(checkEmail == null && checkUsername == null) {
        return {message: "Error: identifier or password is incorrect."}
    } else if (checkEmail instanceof User || checkUsername instanceof User) {
        user = checkEmail instanceof User ? checkEmail : checkUsername;

        const dbPassword = user.password;

        const isPasswordCorrect = await bcrypt.compare(password, dbPassword);

        if (isPasswordCorrect){
            // password is correct, username or email is correct
            // time to tell controller to generate token

            return user;

        } else {
            return {message: "Error: identifier or password is incorrect."}
        }
    } else {
        return {message: "Error authenticating user."}
    }
}

module.exports = User;
