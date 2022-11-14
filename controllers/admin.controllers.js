const AdminModel = require("../models/admin.models");

// Create and Save a new admin
exports.create = async (req, res) => {
  if (
    !req.body.adminUsername &&
    !req.body.adminName &&
    !req.body.adminEmail &&
    !req.body.adminPassword
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const admin = new AdminModel({
    adminUsername:req.body.adminUsername,
    adminName: req.body.adminName,
    adminEmail: req.body.adminEmail,
    adminPassword: req.body.adminPassword,
  });

  await admin
    .save()
    .then((data) => {
      res.send({
        message: "admin created successfully!!",
        admin: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating admin",
      });
    });
};

// Retrieve all admins from the database.
exports.findAll = async (req, res) => {
  try {
    const admin = await AdminModel.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single admin with an id
exports.findOne = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Update a admin by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await AdminModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `admin not found.`,
        });
      } else {
        res.send({ message: "admin updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a admin with the specified id in the request
exports.destroy = async (req, res) => {
  await AdminModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `admin not found.`,
        });
      } else {
        res.send({
          message: "admin deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};