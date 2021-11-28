const { reset } = require('nodemon');
const db = require('./index');
const User = require('./user.model');

const AuthToken = db.sequelize.define('authtoken', {
    token : {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
});

AuthToken.generate = async (user, exp) => {
    var initializedDate = new Date();
    var expirationDate = new Date(initializedDate + exp) // exp in milliseconds
    const tokenBody = JSON.stringify({
        id : user.id,
        iat : initializedDate,
        exp: expirationDate
    });
    const token = Buffer.from(tokenBody).toString('base64');
    // .. create token in db
    const savedToken = await AuthToken.create({
        token: token,
        userId: user.id
    }); 

    const currentUser = await User.findByPk(user.id)
    return {
        user: currentUser,
        authtoken: savedToken.token
    };
}
AuthToken.isAuth = async (req,res,next) => {
    const arrAuthHeader = req.headers.authorization.split(" ");;
    const token = arrAuthHeader[1];

    // ... Check #1 : Is the token inside the DB?
    const dbToken = await AuthToken.findOne({where: {token: token}});

    if (dbToken !== null) {
        const tokenDecode = JSON.parse(Buffer.from(token, 'base64').toString('ascii'));

        const rightNow = new Date();
        // ... Check #2 : Has the token expired?
        if (rightNow > tokenDecode.exp) {
            res.status(403).send({message: "Error: Token has expired, please return to login page and log in again"})
        } else {
            // ... Set the current user as req.user
            req.user = await User.findByPk(tokenDecode.id);
            next();
        }

    } else {
        res.status(403).send({message: "Error: Unauthorize access"})
    }
}
AuthToken.isAdmin = async (req,res,next) => {
    // ... Step 1: grab req.user object and check for isAdmin === true;
    if (req.user) {
        // ... Step 2: next() or res.status(403).send({message: "Error: user does not have admin priviliges"})
        if (res.user.isAdmin === true) {
            next();
        } else {
            res.status(403).send({message: "Error: current user does not have the admin role"})
        }
    } else {
        res.status(500).send({message: "Error: Internal Server error or user is not logged in."})
    }
    
}
User.hasMany(AuthToken);
AuthToken.belongsTo(User);

module.exports = AuthToken