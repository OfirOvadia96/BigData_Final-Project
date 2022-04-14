var bigml = require('bigml');
var fs = require("fs");

var connection = new bigml.BigML('LIORATIYA','4084760438bee80f1b62c41d3ffaeeb7f3eb7751')
var prediction = new bigml.Prediction(connection);

fs.readFile('model.txt', 'utf8', function(err, data){
    "id","firstName","lastName","phone","city","gender","age","prevCalls","totalTime","product","topic"
    prediction.create(data, {"id": "4591928","firstName": "Joy","lastName": "Goodwin","phone": "(555)","city": "Ashkelon","gender": "Female","age": 23,"prevCalls": 50,"totalTime": 50.946},function(error, prediction) { 
        console.log(prediction.object.output); //Output of prediction
    }); 
});
