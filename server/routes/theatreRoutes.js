const express = require("express");
const Theatre = require('../models/theatreModal');
const router = express.Router();


router.post("/add-theatre",async(req,res)=>{
    try{

        const newTheatre = new Theatre(req.body);

        await newTheatre.save();

        res.send({
            success:true,
            message:"New theatre has been added Successfully.."
        })

    }catch(err){

        res.send({
            success:false,
            message:err.message
        })

    }
})



router.get("/get-all-theatres",async(req,res)=>{
    try{

        const allTheatres = await Theatre.find().populate("owner");

        res.send({
            success:true,
            data:allTheatres,
            message:"all theatres data."
        })

    }catch(err){

        res.send({
            success:false,
            message:err.message
        })

    }
})

router.delete("/delete-theatre",async(req,res)=>{
    try{

        await Theatre.findByIdAndDelete(req.body.theatreId);

        res.send({
            success:true,
            message:"Theatres has been deleted."
        })

    }catch(err){

        res.send({
            success:false,
            message:err.message
        })

    }
})



module.exports = router;