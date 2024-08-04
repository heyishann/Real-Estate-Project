const express = require('express');
const testController = require('../controllers/test.controller.js');
const verifyToken = require('../middleware/verifyToken.js')
const router = express.Router();

router.get('/should-be-loggedin',verifyToken, testController.shouldBeLoggedIn)
router.get('/should-be-admin',testController.shouldBeAdmin)

module.exports = router;