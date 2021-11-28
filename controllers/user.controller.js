const User = require('../models/user.model');
const crypto = require('crypto');

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