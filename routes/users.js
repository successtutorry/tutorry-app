const express = require('express');
const router = express.Router();
const Joi = require('joi'); 
const nodemailer = require('nodemailer'); 
const smtpTransport = require('nodemailer-smtp-transport'); 
const mailer = require('../misc/mailer'); 
const url = require('url'); 
const bodyParser = require('body-parser');  
const ContactusForm = require('../models/contactusform'); 
const tutor = require('../models/tutors');



// Validation Schema, validationg the fields which user is entering 
 const contactusSchema = Joi.object().keys({  
  email: Joi.string().email().required(), 
  name: Joi.string().required(),  
  message: Joi.string().required()  
    
});

 router.route('/subject')   router.route('/inner')
  .get((req, res) => {    .get((req, res) => {
     res.render('inner');
     console.log(req.query.subject);  
    
    tutor.find( {subjects:req.query.subject}, function(err, docs){  
     var tutorChunks = [];  
            var chunkSize = 3;  
            for(var i=0; i < docs.length; i+= chunkSize){ 
                tutorChunks.push(docs.slice(i, i+chunkSize)); 
            } 
              res.render('find_tutor', {  tutors: tutorChunks }); 
      }); 
});

  router.route('/find_tutor') 
  .get((req,res) =>{  
      tutor.find( { }, function(err, docs){ 
      var subjectChunks = []; 
      var chunkSize = 3;  
      for(var i=0; i < docs.length; i+= chunkSize){ 
          subjectChunks.push(docs.slice(i, i+chunkSize)); 
      } 
        res.render('find_tutor', {  tutors: subjectChunks }); 
        
    });     
  });




  router.route('/gettutors')  
  .get((req, res, next) => {  
 if((req.query.n!=null)&&(req.query.z!=null)){  
 console.log(req.query.n);  
console.log(req.query.z); 
 }  
      
else{ 
             tutor.find( {$or:[{subjects:req.query.n}, {zipcode:req.query.z}]}, function(err, docs){  
            var tutorChunks = []; 
            var chunkSize = 3;  
            for(var i=0; i < docs.length; i+= chunkSize){ 
                tutorChunks.push(docs.slice(i, i+chunkSize)); 
            } 
              res.render('find_tutor', {  tutors: tutorChunks }); 
              
          }).sort({price:-1});  
           }  
            
});


router.route('/inner')
  .get((req, res) => {
    res.render('inner');
  });

  router.route('/features')
  .get((req, res) => {
    res.render('features');
  });
router.route('/find_tutor')
  .get((req, res) => {
    res.render('find_tutor');
  })

router.route('/become_tutor')
  .get((req, res) => {
    res.render('become_tutor');
  });




  router.route('/contacts')   
  .get((req, res) => {    
    res.render('contacts');   
  }).post((req, res) => { 
      
      const result = Joi.validate(req.body, contactusSchema); 
      const contact_message = result.value.message; 
      if (result.error) { 
          console.log(result.error);  
          
        res.redirect('/users/contacts');  
        
      } 
       const newContact = new ContactusForm(result.value);  
      console.log('newContact', newContact);  
      newContact.save();  
       var rand = Math.floor((Math.random() * 100) + 54); 
      const link = "http://127.0.0.1:4000/users/verify?id="+result.value.email; 
       const html = `Hi there,  
      <br/> 
      Thank you for contacting us   
      </br></br>      
      We have recieved your message.  
      </br> 
      <b>${contact_message}</b> 
      <br/> </br> 
       <a href="${link}">${contact_message}</a>   
      </br></br>    
      We will reach back to you soon. 
      <br/><br/>  
      Have a pleasant day.`   
       // Send email  
      mailer.sendEmail('tutorry.in@gmail.com', result.value.email, 'Message', html);  
      res.redirect('/users/contacts');  
   });



  router.route('/verify')   
  .get((req,res)=>{     
    console.log('request recieved');     
    const useremail = req.query.id;   
     
   tutor.updateOne(   
  { email: useremail },  
  {  
    $set: { price: "100" }    
    
  },function(err,res){  
     if(err){ 
      throw err;  
    } 
    else{ 
      console.log('one document updated');  
    } 
  } 
);  
   });







  router.route('/register')
  .get((req, res) => {
    res.render('register');
  });
  router.route('/profile')
  .get((req, res) => {
    res.render('profile');
  });
 router.route('/personal')
  .get((req, res) => {
    res.render('personal');
  });

  router.route('/overlayform')
  .get((req, res) => {
    res.render('overlayform');
  });
   router.route('/education')
  .get((req, res) => {
    res.render('education');
  });
   router.route('/work')
  .get((req, res) => {
    res.render('work');
  });
   router.route('/teaching')
  .get((req, res) => {
    res.render('teaching');
  });

module.exports = router;