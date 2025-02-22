var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

router.get("/show", userController.getAllData)
router.post("/registration", userController.createUser)

module.exports = router;
