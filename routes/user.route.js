const express = require('express');
const userController = require('../controllers/user.controller.js');
const router = express.Router();
const verifyToken  = require('../middleware/verifyToken.js')

router.get('/',userController.getUsers)
// router.get('/:id', verifyToken, userController.getUser)
router.put('/:id',verifyToken,userController.updateUser)
router.delete('/:id',verifyToken,userController.deleteUser)
router.get('/profilePosts',verifyToken,userController.profilePosts)

module.exports = router;