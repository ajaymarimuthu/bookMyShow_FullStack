const express = require('express');
const mongoose = require('mongoose')
const app = express();

const dbURL ='mongodb://ajay:ajayindia8001@cluster0-shard-00-00.ynxm7.mongodb.net:27017,cluster0-shard-00-01.ynxm7.mongodb.net:27017,cluster0-shard-00-02.ynxm7.mongodb.net:27017/?ssl=true&replicaSet=atlas-q23np2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURL).then(()=>{
    console.log('Database--- Connected....');    
}).catch(err=>console.log('errr---',err));

app.listen(3000, ()=>{
    console.log('Book My show server started-----');    
})

