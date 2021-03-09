const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req,res) => res.render('login'));

// Register Page
router.get('/register', (req,res) => res.render('register'));

// Register Handle
router.post('/register', (req,res) => {
  const {first_name, last_name, email, password, password2} = req.body;
  let errors = [];

  // Check required fields
  if(!first_name || !last_name || !email || !password || !password2){
    errors.push({ msg: 'Please fill in all fields.' });
  }

  // Check passwords Match
  if(password !== password2){
    errors.push({ msg: 'Passwords do not match.' });
  }

  // Check password Length
  if(password.length < 6){
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0){
    // Validation not Passed
    res.render('register', {
      errors,
      first_name,
      last_name,
      email,
      password,
      password2
    });
  }else{
    // Validation passed
    User.findOne({ email: email })
      .then(user => {
        if(user) {
          // User already exists
          errors.push({ msg: 'An account with that email already exists.' })
          res.render('register', {
            errors,
            first_name,
            last_name,
            email,
            password,
            password2
          });
        }else{
          const newUser = new User({
            first_name,
            last_name,
            email,
            password
          });

          // Hash Password
          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Successfully Registered.');
                  res.redirect('/user/login');
                })
                .catch(err => console.log(err));
            }
          ));
        }
      });
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully logged out.');
  res.redirect('/user/login');
});

module.exports = router;
