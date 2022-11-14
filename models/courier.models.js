var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    pickupLocation: {
        type: String,
        required: true,
    },
    pickupAddress: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    endAddress: {
        type: String,
        required: true,
    },
    courierType: {
        type: String,
        required: true
    },
    courierContent: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default : 'Booked'
    },
    customerId : {
        type : String
    },
    deliveryPersonId : {
        type : String,
        default : ''
    }

}, {collection : 'couriers'}
);

var courier = new mongoose.model('Courier', schema);
module.exports = courier;
