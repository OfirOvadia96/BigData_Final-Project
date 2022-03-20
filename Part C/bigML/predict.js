var bigml = require('bigml');
var fs = require("fs");

var connection = new bigml.BigML('LIORATIYA','4084760438bee80f1b62c41d3ffaeeb7f3eb7751')
var prediction = new bigml.Prediction(connection);

fs.readFile('model.txt', 'utf8', function(err, data){
    prediction.create(data, {'totalTime': 50},function(error, prediction) { console.log(prediction);/*console.log(prediction.code)*/}); 
});
