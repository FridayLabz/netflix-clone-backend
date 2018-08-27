const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require('../models/account.model.js');
const Jwt = require('jsonwebtoken');
const config = require('../config.js');

// POST request to Register the user
router.post('/', (req, res) => {
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
        res.status(400).send('Error creating account');
        return;
      }

      res.status(201).send(newAccount);
    });
  });
});


module.exports = router;
