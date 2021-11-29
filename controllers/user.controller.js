const User = require('../models/user.model');
const Assessment = require('../models/assessment.model');
const AuthToken = require('../models/authtoken.model');
const bcrypt = require('bcryptjs')
const { where } = require('sequelize/dist');


exports.register = (req,res) => {
    if (req.body.username && req.body.email && req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        console.log(hash)
        const newUser = {
            email : req.body.email,
            username: req.body.username,
            password: hash
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
exports.getMe = async (req,res) => {
    try {
        if (req.user) {
            return res.status(200).send(req.user)
        }
    } catch (err) {
        res.status(500).send({message: err.message})
    }
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

    if(isAuthenticated.message) {
        // send error message
        res.status(403).send(isAuthenticated)
    } else {
        const authObject = await AuthToken.generate(isAuthenticated, 3600000);
        if (authObject) {
            res.status(200).send({message: "User logged in", data: authObject})
        } else {
            res.status(500).send({message: "Error: internal server error"})
        }
    }
   
}

exports.logout = async (req,res) =>{
    try {
        if(req.user) {
            const dbToken = await AuthToken.findOne({where : {
                userId: req.user.id,
                loggedOut: false,
            }});

            const loggedOutToken = await AuthToken.update({
                loggedOut: true,
                timeOfLogout : new Date()
            },{
                where: {
                    token: dbToken.token,
                    id: dbToken.id
                }
            });
            if (loggedOutToken) {
                res.status(204).send()
            }


        }
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}