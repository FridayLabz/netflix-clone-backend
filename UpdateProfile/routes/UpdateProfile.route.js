
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const Update_controller = require('../controllers/UpdateProfile.controller');


// a simple test url to check that all of our files are communicating correctly.
router.put('/:id/update', Update_controller.Profile_update);

module.exports = router;