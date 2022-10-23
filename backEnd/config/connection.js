const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Znipix').then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("connection to database is lost");
})