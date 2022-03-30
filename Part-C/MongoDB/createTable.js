require("./mongoConnect"); //Connect to MongoDB Compass
const mongoose = require('mongoose');

const callDetailsSchema = new mongoose.Schema({
  id: String,
  city: String,
  gender: String,
  age: Number,
  prevCalls: Number,
  product: String,
  topic: String,
  totalTime: String,
});

const callDetails = mongoose.model('callDetails', callDetailsSchema);

module.exports = callDetails;