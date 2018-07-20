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
                return next(err);
            }
            res.send('Profile Created successfully');
        })
    };

module.exports = router;
