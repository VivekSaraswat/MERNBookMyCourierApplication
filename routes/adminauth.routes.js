const express = require('express');
const router = express.Router();
const {AdminAuthController} = require('../controllers');

router.post("/register", AdminAuthController.register_admin);
router.post("/login", AdminAuthController.login_admin);

module.exports=router;