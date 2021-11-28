const express = require('express');
const router  = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers)

router.get('/:id/my-tests', userController.getUserTests);

router.post('/login', async(req,res)=>{
    
});

router.post('/register', userController.register);
router.get("/logout", async (req,res)=>{

});
router.delete("/:id", async (req,res)=>{

})


module.exports = router