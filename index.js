const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// Connect to  mongoose
mongoose.connect('mongodb://127.0.0.1:27017/blogger')
.then( console.log('MongoDB Connected'))

// Routes
const userRoute = require('./routes/user.routes.js');

// ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// middleare to handle form data
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    res.render("home")
})

// Middleware
app.use("/user", userRoute);

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
});

