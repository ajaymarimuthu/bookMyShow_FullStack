const express = require('express');
const mongoose = require('mongoose')
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
app.use(express.json())

const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL).then(()=>{
    console.log('Database--- Connected....');    
}).catch(err=>console.log('errr---',err));


// this line is important for routes
app.use('/api/users', userRoutes);

app.listen(3000, ()=>{
    console.log('Book My show server started-----aaa');    
})

