const mongoose = require('mongoose');

// creating schema and then using this schema i will create model.
// this model speaks with Databse and get values for us
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true 
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);
