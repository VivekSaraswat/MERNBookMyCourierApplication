//controllers
const CustomerModel = require("../models/customer.models");

// Create and Save a new customer
exports.create = async (req, res) => {
  if (!req.body.password || !req.body.customerName || !req.body.customerMobileNo || !req.body.pickupLocation || !req.body.username ) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const customer = new CustomerModel({
    password: req.body.password,
    customerName: req.body.customerName,
    customerMobileNo: req.body.customerMobileNo,
    pickupLocation: req.body.pickupLocation,
    username: req.body.username
  });
  await customer
    .save()
    .then((data) => {
      res.send({
        message: "Customer created successfully!!",
        customer: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating customer",
      });
    });
};

// Retrieve all customers from the database.
exports.findAll = async (req, res) => {
  try {
    const customer = await CustomerModel.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single customer with an id
exports.findOne = async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ messgae: error.message });
  }
};

// Update a customer by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }
  const id = req.params.id;
  await CustomerModel.findByIdAndUpdate(id, req.body, {
    customerFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Customer not found.",
        });
      } else {
        res.send({ message: "Customer updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// DElete  customer with the specified id in the request
exports.destroy = async (req, res) => {
  await CustomerModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Customer not found.",
        });
      } else {
        res.send({
          message: "Customer deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
