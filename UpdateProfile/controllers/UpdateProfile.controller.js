
const Profile = require('../models/UpdateProfile.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.Profile_update = function (req, res) {
    Profile.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, profile) {
        if (err) return next(err);
        res.send("Profile Updated Successfully");
    });
};