const express = require('express');
const router = express.Router();
const {DeliveryPersonAuthController} = require('../controllers');

router.post("/register", DeliveryPersonAuthController.register_deliveryPerson);
router.post("/login", DeliveryPersonAuthController.login_deliveryPerson);

module.exports=router;
