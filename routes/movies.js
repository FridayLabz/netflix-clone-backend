var express = require('express');
var router = express.Router();
const Movie = require('../models/movie.model');
var ObjectId = require('mongodb').ObjectID;

router.post('/create',(req,res)=>{
   let movie = new Movie ({
       name: req.body.name,
       categories: req.body.categories,
       rating: req.body.rating,
       description: req.body.description,
       views: req.body.views,
       duration:req.body.duration,
       releaseDate:req.body.releaseDate,
       url:req.body.url
   });
   Movie.find({name : req.body.name}, (error, returnedMovie)=>{
       if (error) {
           throw error;
       }
       else{
           if(returnedMovie){
               res.send("Movie already exists");
               return;
           }
           movie.save((err)=> {
               if (err) {
                   throw err;
               }
               res.send('Movie Created successfully');
           })
       }
   });


});

router.get("/getmovies" , (req,res)=>{
   Movie.find({},(err,movies)=>{
      if (err)
          throw err;
      res.json(movies);
   });
});

router.put('/update/:id',(req,res)=>{

    Movie.findByIdAndUpdate(req.params.id , {$set: req.body} , (err , movie)=>{
        if (err)
            throw err;
        res.send("Movie Updated Successfully");
    })


});

module.exports = router;