const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/User")

const app = express();
const PORT = 3000;

app.use(express.json());

//mongodb connection URL
const mongoURL = ('mongodb+srv://asxxfaq:Ashfaqash1234@cluster0.ydhwyye.mongodb.net/')

//connect to MongoDB 
mongoose.connect(mongoURL)
    .then(() => {
        console.log('connected to mongoDB');
    }).catch((error) => {
        console.error('error connecting to MOngoDB ', error);

    })



//middleware to parse URL-encoded data
app.use(express.urlencoded({extended:true}))

//serve static files from the "public" directory
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/users/new' ,(req,res) => {
    res.render('add-user',{title:"Add Student"})
})
app.post('/users',async(req,res) => {
    try{
        const{name ,email,age}=req.body;
        const user = new User({name,email,age});
        await user.save(); //save user to mongoDB
        //redirect to home route (which renders the student list)
        res.redirect("/")
        //res.render('add-user');

    } catch(err){
        res.status(400).send(err);
    }
})

app.get('/', (req, res) => {
    res.send('helloo world');
});
app.get('/home', (req, res) => {
    res.send('<h1> Home Page</h1>');
});
app.get('/about', (req, res) => {
    res.send('<h1> About Page </h1>');
});
app.get('/json', (req, res) => {
    res.json({ name: 'Anu', age: 30 });
});
app.get('/profile', (req, res) => {
    res.render('profile', { title: 'home page', name: 'Ashfaqe' })
});
app.get('/student', (req, res) => {
    const students = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    res.render('student', { title: 'student page', students: students })
});

app.listen(PORT, () => {
    console.log((`Example app listening at http://localhost:${PORT}`));

});
