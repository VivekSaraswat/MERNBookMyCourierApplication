//routes
const express = require("express");
const CourierController = require("../controllers/courier.controllers");
const router = express.Router();

router.get("/", CourierController.findAll);
router.get("/getCourier/:id", CourierController.findOne);
router.get("/getCourierByPickupLocation/:pickupLocation",CourierController.findCourier);
router.get("/getCourierByCustomerId/:customerId",CourierController.findCourierByCustomerId);
router.get("/getCourierByDeliveryPersonId/:deliveryPersonId",CourierController.findCourierByDeliveryPersonId);
router.post("/addCourier", CourierController.create);
router.patch("/updateCourier/:id", CourierController.update);
router.delete("/deleteCourier/:id", CourierController.destroy);

module.exports = router;
