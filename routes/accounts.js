const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  
});

module.exports = router;

/*
 {
   email: ...
   password: ....
 }
*/