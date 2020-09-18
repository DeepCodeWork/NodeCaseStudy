const mongoose = require('mongoose');

const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        
        console.log("Database successfully connected.")
    } catch (error) {
        console.error(error.message)

        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;