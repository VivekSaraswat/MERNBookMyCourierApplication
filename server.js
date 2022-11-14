const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

//Convert incoming data to json format
app.use(bodyParser.json())

//Enabled cors
app.use(cors());

//ALL the express routes

const customerRoutes = require('../Backend/routes/customer.routes');
const courierRoutes = require('../Backend/routes/courier.routes');
const deliveryPersonRoutes = require('../Backend/routes/delieveryPerson.routes')
const adminRoutes = require('../Backend/routes/admin.routes')
const { auth_route } = require('../Backend/routes/')
const {deliveryPerson_auth_route} = require('../Backend/routes')
const {admin_auth_route} = require('../Backend/routes')


const dbConfig =require('./config/database.config.js');
mongoose.connect(dbConfig.url, { useNewUrlParser: true}).then(
    () => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database',
        err);
    process.exit();
});

//setup for the server port number
const port = process.env.PORT || 4000;


//Routes configuration
app.use('/customers', customerRoutes)
app.use('/couriers',courierRoutes);
app.use('/auth', auth_route);
app.use('/deliveryPersons',deliveryPersonRoutes);
app.use('/deliveryPerson/auth',deliveryPerson_auth_route);
app.use('/admin/auth',admin_auth_route);
app.use('/admin',adminRoutes);

//Start our server
const server = app.listen(port, function () {
    console.log("Server listening to port :" + port)
});