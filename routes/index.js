const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Bucket = require('../models/Bucket');
const Transaction = require('../models/Transaction');


router.get('/', (req,res) => res.render('index', {
  scripts: ['js/index.js']
}));

router.get('/finance', (req,res) => res.render('finance', {
  scripts: ['js/financial.js']
}));

router.get('/dashboard', ensureAuthenticated, function(req, res){
  function getBuckets(){
    Bucket.find({ uid: req.user._id}, function(err, buckets){
      if(err){
        console.log(err);
      }else{
        getTransactions(buckets)
      }
    });
  }

  function getTransactions(buckets){
    Transaction.find({ uid: req.user._id, bid: 0}, function(err, transactions){
      if(err){
        console.log(err);
      }else{
        res.render('dashboard', {
          buckets: buckets,
          transactions: transactions,
          scripts: ['js/dashboard.js'],
          user: req.user
        });
      }
    });
  }

  buckets = [];
  getBuckets();
});

router.post('/bucket', ensureAuthenticated, (req,res) => {
  let errors = [];
  const uid = req.user._id;
  const {label, budget} = req.body;
  Bucket.findOne({ uid: uid, label: label })
  .then(bucket => {
    if(bucket) {
      errors.push({ msg: 'Error: A bucket with that label already exists.' });
      res.render('dashboard', {
        scripts: ['js/dashboard.js'],
        user: req.user,
        errors,
        label,
        budget
      });
    }else{
      const newBucket = new Bucket({
        uid,
        label,
        budget
      });
      newBucket.save().then(bucket => {
        req.flash('success_msg', 'Successfully created bucket.');
        res.redirect('/dashboard');
      }).catch(err => console.log(err));
    }
  })
});

router.post('/transaction', ensureAuthenticated, (req, res) => {
  function getLabel(){
    return 'LABEL: ' + ((Math.random() + 1).toString(36).substring(2));
  }
  function getAmount(){
    return (Math.random() * 100).toFixed(2);
  }
  const uid = req.user._id;
  const label = getLabel();
  const amount = getAmount();
  const newTransaction = new Transaction({
    uid,
    label,
    amount
  });
  newTransaction.save().then(transaction => {
    req.flash('success_msg', 'Successfully added transaction.');
    res.redirect('/dashboard');
  }).catch(err => console.log(err));
});

router.post('/transaction/delete', ensureAuthenticated, (req, res) => {
  let uid = req.user._id;
  let label = req.body.label;
  Transaction.deleteOne( {label: label, uid: uid} ).then(transaction => {
    req.flash('success_msg', 'Successfully deleted transaction.');
    res.send();
  }).catch(err => console.log(err));
});

router.post('/bucket/delete', ensureAuthenticated, (req, res) => {
  let uid = req.user._id;
  let label = req.body.label;
  Bucket.deleteOne( {label: label, uid: uid} ).then(bucket => {
    req.flash('success_msg', 'Successfully deleted bucket.');
    res.send();
  }).catch(err => console.log(err));
});


module.exports = router;