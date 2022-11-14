const express = require('express');
const router = express.Router();
const {AuthController} = require('../controllers/');

router.post("/register", AuthController.register_customer);
router.post("/login", AuthController.login_customer);

module.exports=router;

