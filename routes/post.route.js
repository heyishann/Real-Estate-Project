const express = require('express');
const verifyToken = require('../middleware/verifyToken.js')
const postController = require('../controllers/post.controller.js')
const router = express.Router();

router.get('/',postController.getPosts);
router.get('/:id',postController.getPost);
router.post('/', verifyToken ,postController.addPost);
router.put('/:id',verifyToken,postController.updatePost);
router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router;