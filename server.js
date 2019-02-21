const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app  = express();

hbs.registerPartials(__dirname + '/views/partials')
//using this helper now there is no need to call same thing again n again
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('scremit',(text)=>{
  return text.toUpperCase()
})
app.set('view engine', 'hbs')

app.use((req,res,next)=>{ //if u are using middleware the you have to call next methond otherwise no request will be handle by express js
var now = new Date().toString();
var log = `${now} : ${req.method} ${req.url}`
console.log(log);
fs.appendFile('server.log', log + '\n', (err)=>{
  if(err){
    console.log('Unable to append log.');
  }
})
next();
})
app.use((req,res,next)=>{
  res.render('maintenance.hbs')
})
app.use(express.static(__dirname + '/public'))
app.get('/details',(req,res)=>{
  // res.send('<h1>Hello Express</h1>');
  res.send({
    firstName : 'Kanish',
    lastName : 'Mishra',
    status : 'learning node.js and express.js',
    likes : [
      'Developing',
      'Gaming'
    ]
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page',
    // currentYear : new Date().getFullYear() //we replace it with helper
  });
})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    text : 'Hey Welcome to express js home page',
    // currentYear : new Date().getFullYear()
  });
})

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage : 'Unable to handle request'
  })
})
app.listen(3000,()=>{
  console.log('Server is up on port 3000');
})
