const express = require("express");
const app = express();
const dbConnect = require('./config/db.config')
const UserRoutes = require('./routes/UserRoutes');
const GridfsRoutes = require('./routes/GridFsRoutes');
const { initGirdfs } = require("./model/user.model");
require('dotenv').config();

//View Engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index'); 
})

//Middleware
app.use(express.json());

//Connecting db
dbConnect();

//Routes
app.use('/api', UserRoutes)
app.use('/api', GridfsRoutes)


//Starting the server
app.listen( process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})