const express = require('express');
const router = express.Router();
const Account = require('../models/account.model.js');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  Account.findOne({ email }, (err, account) => {
    if (err) {
      console.log('Error in finding account ' + err);
      res.send('Error creating accout');
      return;
    }

    if (account) {
      res.status(405).send('Error creating accout');
      return;
    }

    const newAccount = new Account({ email: email, password: password });
    newAccount.save(err => {
      if (err) {
        console.log('Error saving new account ' + err);
        res.send('Error creating accout');
        return;
      }

      res.status(201).send(newAccount);
    });
  });
});

module.exports = router;
