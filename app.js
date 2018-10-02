
const express = require('express');
const morgan = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const request = require('request');
const mongoose = require('mongoose');


mongoose.connect('mongodb://root:root123@ds251362.mlab.com:51362/tutorry', { useNewUrlParser: true}, function(err){

  if(err){
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});


var URL = "https://www.ipapi.co/json";
var city ;

request({

 url: URL,
 json: true
},(err,res,body) => {

 if(err){
   console.log(err);
 }
 else{


   city = body.city;
    console.log(body.city);
     console.log(body.ip);
 }

});


const app = express();
app.use(morgan('dev'));

// View Engine 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(4000, () => console.log('Server started listening on port 4000!'));
