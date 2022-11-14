//controllers
const CourierModel = require("../models/courier.models");

// Create and Save a new courier
exports.create = async (req, res) => {
  if (!req.body.endLocation || !req.body.courierType || !req.body.courierContent ) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const courier = new CourierModel({
    customerId : req.body.customerId,
    pickupLocation : req.body.pickupLocation,
    pickupAddress : req.body.pickupAddress,
    endLocation: req.body.endLocation,
    endAddress: req.body.endAddress,
    courierType: req.body.courierType,
    courierContent: req.body.courierContent,
  });
  await courier
    .save()
    .then((data) => {
      res.send({
        message: "Courier created successfully!!",
        courier: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating courier",
      });
    });
};

// Retrieve all couriers from the database.
exports.findAll = async (req, res) => {
  try {
    const courier = await CourierModel.find();
    res.status(200).json(courier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single courier with an id
exports.findOne = async (req, res) => {
  try {
    const courier = await CourierModel.findById(req.params.id);
    res.status(200).json(courier);
  } catch (error) {
    res.status(404).json({ messgae: error.message });
  }
};

//Find all unbooked courier with a pickup Location
exports.findCourier = async (req, res) => {
  try {
    const courier = await CourierModel.find({pickupLocation : req.params.pickupLocation , status : 'Booked' , deliveryPersonId : ''});
    res.status(200).json(courier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Find all courier with customer Id
exports.findCourierByCustomerId = async (req, res) => {
  try {
    const courier = await CourierModel.find({customerId : req.params.customerId});
    res.status(200).json(courier);
  } catch (error) {
    res.status(404).json({ messgae: error.message });
  }
};

//Find all courier with deliveryPerson Id
exports.findCourierByDeliveryPersonId = async (req, res) => {
  try {
    const courier = await CourierModel.find({deliveryPersonId : req.params.deliveryPersonId});
    res.status(200).json(courier);
  } catch (error) {
    res.status(404).json({ messgae: error.message });
  }
};


// Update a courier by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }
  const id = req.params.id;
  await CourierModel.findByIdAndUpdate(id, req.body, {
    courierFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Courier not found.",
        });
      } else {
        res.send({ message: "Courier updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// DElete  courier with the specified id in the request
exports.destroy = async (req, res) => {
  await CourierModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Courier not found.",
        });
      } else {
        res.send({
          message: "Courier deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
