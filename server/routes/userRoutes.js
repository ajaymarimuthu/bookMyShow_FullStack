const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {

    try {
        // fetcing user from Database
        const userExists = await User.findOne({ email: req.body.email });
        // am checking whether user is already exisiting
        if (userExists) {
            res.send({
                suucess: 'false',
                message: "User already exists"
            })
        }
        // generating salt to add it with our hash fucntion
        const salt = await bcrypt.genSalt(10);

        // here we are creating hashed pwd
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //assinging hashed pwd to the actual pwd.
        req.body.password = hashedPassword;

        // whole body is comes in req object , so we can directly pass inside User model 
        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "user created successfully"
        })


    }
    catch(err){
        console.log('err', err);
        res.send({
            success: false,
            message: err
        })
    }
})

router.post('/login',async(req,res)=>{

    try{
        // fetcing user from Database
        const userExists = await User.findOne({email: req.body.email});

        // am checking whether user is not already exisiting
        if(!userExists){
            res.send({
                success: false,
                message: 'User does not exist'
            })
        }

        //Using bcrypt am comapre databse pwd and user entered pwd
        const validPassword = await bcrypt.compare(req.body.password, userExists.password) ;

        // am checking whether password is not correecttt
        if(!validPassword){
            res.send({
                success: false,
                message: 'Invalid Password'
            })
            return;
        }
        res.send({
            success: true,
            message: 'Logged In'
        })


    }
    catch(err){
        console.log('err', err);
        res.send({
            success: false,
            message: err
        })
        
    }

})

module.exports = router;