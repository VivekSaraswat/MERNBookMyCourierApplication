const Admin = require('../models/admin.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const api_config = require("../config/api.js");

const AdminAuthController = {
    /* create new admin */
    async register_admin(req, res, next) {
        const newAdmin = new Admin({
            adminName: req.body.adminName,
            adminEmail: req.body.adminEmail,
            adminPassword: bcrypt.hashSync(req.body.adminPassword, 10),
            adminUsername : req.body.adminUsername,

        });
        try {
            const admin = await newAdmin.save();
            res.status(201).json({
                type: 'success',
                message: "Admin has been created successfuly",
                admin
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
    
    /* login existing admin */
    async login_admin(req, res) {
        const admin = await Admin.findOne({ adminUsername: req.body.adminUsername });
        if (!admin || !bcrypt.compareSync(req.body.adminPassword, admin.adminPassword)) {
            res.status(500).json({
                type: "error",
                message: "Admin not exists or invalid credentials",
            })
        } else {
            const accessToken = jwt.sign({
                id: admin._id,
            },
                api_config.api.jwt_secret,
                { expiresIn: "1d" }
            );
            const { adminPassword, ...data } = admin._doc;
            res.status(200).json({
                type: "success",
                message: "Successfully logged",
                ...data,
                accessToken
            })
        }
    }
};
module.exports = AdminAuthController;