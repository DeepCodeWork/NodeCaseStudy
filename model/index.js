const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MyDB",{ useNewUrlParser: true, useUnifiedTopology: true },(error)=>{
    if(error)
    {
        console.log("Error connecting");
    }
    else{
        console.log("Connection successs");
    }
});