const express = require("express");
const Movie = require('../models/movieModal');
const router = express.Router();


//add movies by admin
//get all movies
//update movie
//delete movie
//fetch single movie by using id

router.post('/add-movie',async(req,res)=>{

    try{

        const newMovie  = new Movie(req.body);
        await newMovie.save();

        res.send({
            message: "New Movie has been added",
            success: true
        })

    } catch(err){

        res.send({
            success:false,
            messgae:err.message
        })

    }
})

router.get('/get-all-movies', async(req,res)=>{
    try{

        const allMovies = await Movie.find();

        res.send({
            success:true,
            message:"successfully fetched Movies",
            data:allMovies
            
        })

    }catch(err){
        res.send({
            message:err.message,
            success:false
        })
    }
})


router.put('/update-movie', async(req,res)=>{
    try{

        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        const updatedMovie = await Movie.findById(req.body.movieId);

        res.send({
            success:true,
            message:"Movie updated",
            data:updatedMovie
            
        })

    }catch(err){
        res.send({
            message:err.message,
            success:false
        })
    }
})


router.delete('/movie/:id', async(req,res)=>{
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id);

        res.send({
            success:true,
            message:"Movie Deleted",
            data:movie          
        })

    }catch(err){
        res.send({
            message:err.message,
            success:false
        })
    }
})

router.get('/movie/:id', async(req,res)=>{
    try{

        const singleMovie = await Movie.findById(req.params.id);

        res.send({
            success:true,
            message:"successfully fetched Movie",
            data:singleMovie
            
        })

    }catch(err){
        res.send({
            message:err.message,
            success:false
        })
    }
})

// 




module.exports = router;