const User = require('../models/user.model');
const Assessment = require('../models/assessment.model');
const AuthToken = require('../models/authtoken.model');
const crypto = require('crypto');
const { Buffer } = require('buffer')
const { where } = require('sequelize/dist');

function generateSalt(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length)
}
function hashPassword(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let hashedPass = hash.digest('hex');
    return hashedPass;
}
exports.register = (req,res) => {
    if (req.body.username && req.body.email && req.body.password) {
        const salt = generateSalt(128);
        const scrambledPass = hashPassword(req.body.password, salt);

        const newUser = {
            email : req.body.email,
            username: req.body.username,
            password: scrambledPass
        }
        User.create(newUser)
            .then(data=>{
                res.status(201).send(data);
            })
            .catch(err=>{
                res.status(500).send({message : err || "Error has occured in user creation."})
            })
    } else {
        res.status(400).send({message: "Error: Please include and email, uswername and password"})
    }
}

exports.getAllUsers = async (req,res) =>{
    const allUsers = await User.findAll()
    res.status(200).send(allUsers);
}
exports.getUserTests = async (req,res) => {
    // const user = await User.findByPk(req.params.id);
    // const userTests = user.getTests();
    Assessment.findAll({where : {
        userId : req.params.id
    }}).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.status(400).send(err)
    })
    
}

exports.login = async (req,res) => {
    if(!req.body.password || !req.body.identifier) {
        res.status(400).send({message: "Error: Must have an identifier (email or username) and password"})
    }
    const isAuthenticated = await User.authenitcate(req.body.identifier, req.body.password);

    if(isAuthenticated !== true) {
        // send error message
        res.status(403).send(isAuthenticated)
    } else {
        const authObject = await AuthToken.generate(isAuthenticated, 400000);
        if (authObject) {
            res.status(200).send({message: "User logged in", data: authObject})
        } else {
            res.status(500).send({message: "Error: internal server error"})
        }
    }
   
}