const express = require("express");
const DeliveryPersonController = require("../controllers/deliveryPerson.controllers");

const router = express.Router();
router.get("/", DeliveryPersonController.findAll);
router.get("/getDeliveryPerson/:id", DeliveryPersonController.findOne);
router.post("/addDeliveryPerson", DeliveryPersonController.create);
router.patch("/updateDeliveryPerson/:id", DeliveryPersonController.update);
router.delete("/deleteDeliveryPerson/:id", DeliveryPersonController.destroy);
module.exports = router;