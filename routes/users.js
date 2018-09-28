const express = require('express');
const router = express.Router();
const Joi = require('joi');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const mailer = require('../misc/mailer');
const url = require('url');
const bodyParser = require('body-parser');
const ContactusForm = require('../models/contactusform');
const passport = require('passport');
const randomstring = require('randomstring');




const contactusSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  message: Joi.string().required()
  
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
  })
  

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