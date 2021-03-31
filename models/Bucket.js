const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  date_created: {
    type: String,
    default: Date.now
  }
});

const Bucket = mongoose.model('Bucket', BucketSchema);
module.exports = Bucket;