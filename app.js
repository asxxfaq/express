const express = require ('express');
const app = express();
const PORT = 3000; 
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.send('helloo world');
});
app.get('/home',(req,res) => {
    res.send('<h1> Home Page</h1>');
});
app.get('/about',(req,res) => {
    res.send('<h1> About Page </h1>');
});
app.get('/json',(req,res) => {
    res.json({name:'Anu' ,age:30});
});
app.get('/profile',(req,res) => {
    res.render('profile' ,{title:'home page',name:'Ashfaqe'})
});
app.listen(PORT  ,() => {
    console.log((`Example app listening at http://localhost:${PORT}`));

});