const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog.models.js');

const app = express();
const PORT = 8000;

// Connect to  mongoose
mongoose.connect('mongodb://127.0.0.1:27017/blogger')
.then( console.log('MongoDB Connected'))

// Routes
const userRoute = require('./routes/user.routes.js');
const blogRoute = require('./routes/blog.routes.js');
const { checkForAuthenticationCookie } = require('./middlewares/auth.middlewares.js');

// ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// middleware 
app.use(express.urlencoded({ extended: false})) //to handle form data
app.use(cookieParser())  // to parse cookie
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))    // to serve static files (images) , {otherwise it will think of them as routes & give error}
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home',{
        user: req.user,
        blogs: allBlogs,
    })
    // console.log(req.user);
})
// Middleware
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
});

