const express = require('express');
const morgan = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');	
const passport  = require('passport');	
const http = require('http');	
const requestIp = require('request-ip');	
const where = require('node-where');	
var iplocation = require('iplocation');	
 mongoose.Promise = global.Promise;	
 //database connection 	
 mongoose.connect('mongodb://root:root123@ds251362.mlab.com:51362/tutorry', { useNewUrlParser: true}, function(err){	
   if(err){	
    console.log(err);	
  } else {	
    console.log('Connected to the database');	
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

/*const ipMiddleware = function(req, res, next) {	
    const clientIp = requestIp.getClientIp(req); 	
    next();	
};*/	
 /*app.use(requestIp.mw())	
app.use(function(req, res) {	
    const ip = req.clientIp;	
    console.log(ip);	
     res.end(ip);	
});	
  where.is('10.14.28.230', function(err, result) {	
  if (result) {	
  	
  console.log(result);	
    console.log('Country: ' + result.get('country'));	
  	
  }	
});*/	
 /*iplocation('198.168.1.207', function (error, res) {	
 	
 if(error){	
  console.log(error);	
}	
  else{	
    console.log(res);	
  }	
 	
  });*/	

  // catch 404 and forward to error handler	
app.use((req, res, next) => {	
   res.render('notFound');	
});


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(4000, () => console.log('Server started listening on port 4000!'));
