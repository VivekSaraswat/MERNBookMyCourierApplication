const DeliveryPerson = require('../models/deliveryperson.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const api_config = require("../config/api.js");

const DeliveryPersonAuthController = {
    /* create new deliveryPerson */
    async register_deliveryPerson(req, res, next) {
        const newDeliveryPerson = new DeliveryPerson({
            deliveryPersonName: req.body.deliveryPersonName,
            deliveryPersonMobileNo: req.body.deliveryPersonMobileNo,
            deliveryPersonPassword: bcrypt.hashSync(req.body.deliveryPersonPassword, 10),
            deliveryPersonUsername : req.body.deliveryPersonUsername,
            deliveryPersonPickupLocation: req.body.deliveryPersonPickupLocation

        });
        try {
            const deliveryPerson = await newDeliveryPerson.save();
            res.status(201).json({
                type: 'success',
                message: "Delivery Person has been created successfuly",
                deliveryPerson
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
    /* login existing deliveryPerson */
    async login_deliveryPerson(req, res) {
        const deliveryPerson = await DeliveryPerson.findOne({ deliveryPersonUsername: req.body.deliveryPersonUsername });
        if (!deliveryPerson || !bcrypt.compareSync(req.body.deliveryPersonPassword, deliveryPerson.deliveryPersonPassword)) {
            res.status(500).json({
                type: "error",
                message: "DeliveryPerson not exists or invalid credentials",
            })
        } else {
            const accessToken = jwt.sign({
                id: deliveryPerson._id,
            },
                api_config.api.jwt_secret,
                { expiresIn: "1d" }
            );
            const { deliveryPersonPassword, ...data } = deliveryPerson._doc;
            res.status(200).json({
                type: "success",
                message: "Successfully logged",
                ...data,
                accessToken
            })
        }
    }
};
module.exports = DeliveryPersonAuthController;