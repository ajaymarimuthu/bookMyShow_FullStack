const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware');

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

        // console.log('userExists._id', userExists._id)

        // am checking whether password is not correecttt
        if(!validPassword){
            res.send({
                success: false,
                message: 'Invalid Password'
            })
            return;
        }

        // while logging in we need to create a token and send to client
        // jwt.sign({id}, PrivateKey , expiringDate);
        const token =jwt.sign({userId: userExists._id}, "ajay_bms", {expiresIn: "1d"})
        res.send({
            success: true,
            message: 'Logged In',
            token: token
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


router.get('/get-current-user', authMiddleware , async(req,res)=>{
   // informt the server if the token is valid or not and who the user is

   const user = await User.findById(req.body.userId).select("-password");
   console.log('-------yessssss-----', user)
   res.send({
    success:true,
    message: "You are authorized",
    data: user
   })
    
}) 

// router.get('/getUsers', async(req,res)=>{
//     // informt the server if the token is valid or not and who the user is
 
//     const user = await User.find().select("-password");
//     res.send({
//      success:true,
//      message: "You are authorized",
//      data: user
//     })
     
//  }) 
 
module.exports = router;