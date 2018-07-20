var express = require('express');
var router = express.Router();
const Profile = require('../models/profile.model');
var ObjectId = require('mongodb').ObjectID;

router.get('/:id', (req, res)=> {

    Profile.findById({_id:ObjectId(req.params.id)}, function (err, Profile) {
        if (err) {
            return next(err);
        }
        // res.send('here');
        res.send(Profile);
    })
});

router.post('/create', (req, res) => {
        let profile = new Profile(
            {
                userName: req.body.userName,
                urlPhoto: req.body.urlPhoto
            }
        );

        profile.save(function (err) {
            if (err) {
                throw err;
            }
            res.send('Profile Created successfully');
        })
});

// Require the controllers WHICH WE DID NOT CREATE YET!!


// a simple test url to check that all of our files are communicating correctly.
router.put('/update/:id',(req, res) => {
    Profile.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, profile) {
        if (err) return next(err);
        var jsonData = {};
        jsonData["msg"]="Profile Updated Successfully";
        res.send(jsonData);
    });
});

module.exports = router;
