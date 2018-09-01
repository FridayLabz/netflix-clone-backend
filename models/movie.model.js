const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var movieSchema = new Schema({
    name: {type: String, required: true,min: 1, max: 100,trim: true},
    categories: [String],
    rating: {
        likes: {type: Number,default:0},
        dislikes: {type: Number,default:0}
    },
    description: String,
    views: {type:Number,default:0},
    duration:Number,
    releaseDate:Date,
    url:String
});

module.exports = mongoose.model('Movies', movieSchema);