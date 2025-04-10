const mongoose =require("mongoose");

const showSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },    
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId, //connecting with id
        ref: 'movies', // connecting with users movies or collection

        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: Array,
        default: []
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"theatres",
        required: true
    }

})
module.exports = mongoose.model("shows",showSchema);