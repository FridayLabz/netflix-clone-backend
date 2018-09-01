const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require('../models/account.model.js');
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const config = require('../config');
var indexRouter = require('./index');
var usersRouter = require('./users');
var movieRouter = require('./movies');

router.use((req,res,next)=>{
   var token = req.body.token || req.query.token || req.headers.authorization;

   if(token) {
       jwt.verify(token , config.HASH_SECRET , (err , decoded) => {
           if (err) {
               return res.json({success: false , message: 'Failed to authenticate token.'});
           } else {
               req.decoded = decoded;
               next();
           }
       });

   } else {
       return res.status(403).send({
           success:false ,
           message:'No token provided.'
       });
   }
});

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/movie', movieRouter);

module.exports = router;
