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

router.post('/auth', (req, res) => {
  const { token } = req.body;
  Jwt.verify(token, config.HASH_SECRET, (err, payload) => {
    if (err) {
      console.log('Authorization error', err);
      res.status(400).json({ message: 'Authentication failed' });
      return;
    } else {
      res.status(200).json({ message: 'User authorized! 👍 👍' });
      return;
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Error Empty user or pass' });
    return;
  }
  Account.findOne({ email }, (err, account) => {
    if (err) {
      res.status(400).json({ message: 'Invalid Email or Password' });
      return;
    }
    if (!account) {
      res.status(400).json({ message: 'Invalid Email or Password' });
      return;
    }
    if (!bcrypt.compareSync(password, account.password)) {
      res.status(400).json({ message: 'Invalid Email or Password' });
      return;
    } else {
      const token = Jwt.sign(
        JSON.stringify({ id: account._id }),
        config.HASH_SECRET
      );
      res.status(200).json({ message: 'Login Successfully', token });
      return;
    }
  });
});
module.exports = router;
