const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
     title:{
        type:String,
        reuired: true,        
    },
    description:{
        type:String,
        reuired: true,        
    },
    duration:{
        type:Number,
        reuired: true,        
    },
    genre:{
        type:String,
        reuired: true,        
    },
    language:{
        type:String,
        reuired: true,        
    },
    releaseDate:{
        type:Date,
        reuired: true,        
    },
    poster:{
        type:String,
        reuired: true,        
    }
})

const Movies = mongoose.model('movies',movieSchema);

module.exports = Movies;