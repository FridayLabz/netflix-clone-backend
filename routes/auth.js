const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require('../models/account.model.js');
const ObjectId = require('mongodb').ObjectID;
const config=require('../config.js');
var jwt = require('jsonwebtoken');

router.post('/',(req , res)=>{
    Account.findOne({
        email:req.body.email
    },(err,account)=>{
        if (err) throw err;
        if (!account)
        {
            res.json({success:false , message:'Authentication failed, Account not found.'});
        }else if (account){

            if(!bcrypt.compareSync(req.body.password,account.password)){
                res.json({success:false , message:'Authentication failed. Wrong Password'});
            } else {
                const payload ={
                    id: account.id

                };
                var token = jwt.sign(payload,config.HASH_SECRET, {
                    expiresInMinutes: 1440
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

module.exports = router;
