//app.js
const express = require('express');
const bodyParser = require('body-parser');
const UpdateProfile_route = require('./routes/UpdateProfile.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
var dev_db_url = 'mongodb://abdelrhmanakram:abdelrhmanakram1@ds125211.mlab.com:25211/netflix';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/UpdateProfile', UpdateProfile_route);


let port = 1234;


app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});