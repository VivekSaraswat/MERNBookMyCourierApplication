const DeliveryPersonModel = require("../models/deliveryperson.model");
// Create and Save a new deliveryperson
exports.create = async (req, res) => {
  if (
    !req.body.deliveryPersonUsername &&
    !req.body.deliveryPersonName &&
    !req.body.deliveryPersonMobileNo &&
    !req.body.deliveryPersonPassword
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const deliveryperson = new DeliveryPersonModel({
    deliveryPersonUsername:req.body.deliveryPersonUsername,
    deliveryPersonName: req.body.deliveryPersonName,
    deliveryPersonMobileNo: req.body.deliveryPersonMobileNo,
    deliveryPersonPassword: req.body.deliveryPersonPassword,
    deliveryPersonPickupLocation: req.body.deliveryPersonPickupLocation
  });

  await deliveryperson
    .save()
    .then((data) => {
      res.send({
        message: "deliveryperson created successfully!!",
        deliveryperson: data,
       // deliveryPerson:deliveryPerson.find().populate('customer')
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating deliveryperson",
      });
    });
};
// Retrieve all deliverypersons from the database.
exports.findAll = async (req, res) => {
  try {
    const deliveryperson = await DeliveryPersonModel.find();
    res.status(200).json(deliveryperson);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Find a single deliveryperson with an id
exports.findOne = async (req, res) => {
  try {
    const deliveryperson = await DeliveryPersonModel.findById(req.params.id);
    res.status(200).json(deliveryperson);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Update a deliveryperson by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await DeliveryPersonModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `deliveryperson not found.`,
        });
      } else {
        res.send({ message: "deliveryperson updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
// Delete a deliveryperson with the specified id in the request
exports.destroy = async (req, res) => {
  await DeliveryPersonModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `deliveryperson not found.`,
        });
      } else {
        res.send({
          message: "deliveryperson deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};