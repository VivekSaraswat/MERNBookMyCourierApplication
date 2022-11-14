var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
    unique : true
  },
  adminName: {
    type: String, 
    required: true,
  },
  adminEmail: {
    type : String,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  },{collection:'admins'}
);
var admin = new mongoose.model("Admin", schema);
module.exports = admin;