const express = require("express");
const AdminController = require("../controllers/admin.controllers");

const router = express.Router();
router.get("/", AdminController.findAll);
router.get("/getAdmin/:id", AdminController.findOne);
router.post("/addAdmin", AdminController.create);
router.patch("/updateAdmin/:id", AdminController.update);
router.delete("/deleteAdmin/:id", AdminController.destroy);
module.exports = router;