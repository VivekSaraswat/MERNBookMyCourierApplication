//routes
const express = require("express");
const CustomerController = require("../controllers/customer.controllers");
const router = express.Router();

router.get("/", CustomerController.findAll);
router.get("/getCustomer/:id", CustomerController.findOne);
router.post("/addCustomer", CustomerController.create);
router.patch("/updateCustomer/:id", CustomerController.update);
router.delete("/deleteCustomer/:id", CustomerController.destroy);

module.exports = router;
