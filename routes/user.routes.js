const express = require('express');
const router  = express.Router();
const AuthToken = require('../models/authtoken.model');
const userController = require('../controllers/user.controller');
const { isAuth, isAdmin } = require('../models/authtoken.model');

router.get('/', isAuth, isAdmin, userController.getAllUsers)
router.get('/me', isAuth, userController.getMe)
router.get('/:id/my-tests', isAuth, userController.getUserTests);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get("/logout", isAuth, userController.logout);
router.delete("/:id", async (req,res)=>{

})


module.exports = router