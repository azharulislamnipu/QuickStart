const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();

const userRouter = require('./router/userRoute');

require('dotenv').config();
mongoose.Promise = global.Promise;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(passport.initialize());
require('./utils/passport')(passport);

app.use('/api/users',userRouter); 

app.use('/',(req, res)=>{
    res.status(200).json({
        message:'This is your rest api servers side pls visit your specific route for task'
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
    mongoose.connect(process.env.DATABASE,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } , () => {
        console.log('Databese Connected ....');
    });
})