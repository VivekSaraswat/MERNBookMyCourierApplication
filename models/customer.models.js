//model
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerMobileNo: {
        type: String,
        required: true,
    },
    customerWalletAmount: {
        type: Number,
        default : 0       
    },
    pickupLocation: {
        type: String,
        required: true,
    },
    courierId: {
        type: String,
    },
    delieveryPersonId: {
        type: String,
    },
}, {collection : 'customers'}
);

var customer = new mongoose.model( 'Customer' , schema);
module.exports = customer;