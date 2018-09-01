const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require('../models/account.model.js');
const ObjectId = require('mongodb').ObjectID;
const config=require('../config.js');
var jwt = require('jsonwebtoken');

router.post('/login',(req , res)=>{
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
                //    expiresInMinutes: 1440
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


// POST request to Register the user
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        res.status(400).send('Error creating account');
        return;
    }

    console.log(req.body);
    Account.findOne({ email }, (err, account) => {
        // Error connecting to the DB
        if (err) {
            console.log('Error in finding account ' + err);
            res.status(400).send('Error creating accout');
            return;
        }

        // User is already in the DB
        if (account) {
            res.status(400).send('Error creating account');
            return;
        }
        // Hashing password
        const hashPassword = bcrypt.hashSync(password, 0);

        // Creating and saving the new user
        const newAccount = new Account({ email: email, password: hashPassword });
        newAccount.save(err => {
            if (err) {
                console.log('Error saving new account ' + err);
                res.status(201).send('Error creating account');
                return;
            }

            res.status(201).send(newAccount);
        });
    });
});

module.exports = router;
