// https://github.com/bigmlcom/bigml-node/blob/master/docs/index.md
// https://www.dataem.com/bigml
// Don't run the all code all the time - produce a model ONCE and use for predictions from now on
// Look for an asyc version.

var bigml = require('bigml');
var fs = require("fs");
var exportDB2csv = require("../MongoDB/exportDB");

var connection = new bigml.BigML('LIORATIYA','4084760438bee80f1b62c41d3ffaeeb7f3eb7751')
// var connection = new bigml.BigML('OFIRRR999','bce5e228c27e09db2e07949f5943d097f110c368')

// var model_info;

const BigML = {
  createModel: function () {
    
    var source = new bigml.Source(connection);
    source.create('callDetails.csv', function(error, sourceInfo) {
        if (!error && sourceInfo) {
            const dataset = new bigml.Dataset(connection);
            dataset.create(sourceInfo, function(error, datasetInfo) {
                if (!error && datasetInfo) {
                    var model = new bigml.Model(connection);
                    model.create(datasetInfo, function (error, modelInfo) {
                      if (!error && modelInfo) {

                        fs.writeFile("model.txt",modelInfo.object.resource,(err)=>{
                          if(err) return console.log(err);
                          console.log("Model created!");
                        })
                      }
                    });
                }
            });
        }
    })

    return "Model created!";
  },
  predict: function (data) {
    var prediction = new bigml.Prediction(connection);

    fs.readFile('model.txt', 'utf8', function(err, data){
      prediction.create(data, {"id": "4591928","firstName": "Joy","lastName": "Goodwin","phone": "(555)","city": "Ashkelon","gender": "Female","age": 23,"prevCalls": 10,"totalTime": 50.946},function(error, prediction) { 
        // console.log(model_info); //Output of prediction
        // console.log(prediction.object.output); //Output of prediction
        var result = prediction.object.output + "";
        fs.writeFile('predict.txt', result, (err) => {
              if(err) return console.log(err);
              console.log(result); //Output of prediction
        });
      });
    });
  }
}

module.exports = BigML