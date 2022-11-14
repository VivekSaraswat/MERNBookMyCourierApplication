const Customer = require('../models/customer.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const api_config = require("../config/api.js");

const AuthController = {
    /* create new customer */
    async register_customer(req, res, next) {
        const newCustomer = new Customer({
            customerName: req.body.customerName,
            customerMobileNo: req.body.customerMobileNo,
            password: bcrypt.hashSync(req.body.password, 10),
            pickupLocation: req.body.pickupLocation,
            username : req.body.username,
        });
        try {
            const customer = await newCustomer.save();
            res.status(201).json({
                type: 'success',
                message: "Customer has been created successfuly",
                customer
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
    /* login existing customer */
    async login_customer(req, res) {
        const customer = await Customer.findOne({ username: req.body.username });
        if (!customer || !bcrypt.compareSync(req.body.password, customer.password)) {
            res.status(500).json({
                type: "error",
                message: "Customer not exists or invalid credentials",
            })
        } else {
            const accessToken = jwt.sign({
                id: customer._id,
            },
                api_config.api.jwt_secret,
                { expiresIn: "1d" }
            );
            const { password, ...data } = customer._doc;
            res.status(200).json({
                type: "success",
                message: "Successfully logged",
                ...data,
                accessToken
            })
        }
    }
};
module.exports = AuthController;