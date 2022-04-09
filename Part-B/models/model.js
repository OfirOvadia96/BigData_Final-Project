const express = require("express");
const redis = require('redis');
const client = redis.createClient();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

client.on('connect', function() {
  console.log('Connected!'); // Connected!
});

// client.del('user_hash');

client.hmset('user_hash', {
  'date': '25.01.22',
  'time': '09:45',
  'firstName': 'Avi',
  'lastName': 'Nimni',
  'City': 'TLV',
  'gender': 'male',
  'age': '42',
  'prevCalls': '5',
  'topic': 'complain'
});

client.hgetall('user_hash', function async (err, object) {
  console.log(object); // { firstName: 'Avi', lastName: 'Nimni', City: 'TLV' }
});

console.log("The customer name is: " + client.hgetall('user_hash').firstName + " " + client.hgetall('user_hash').lastName);
