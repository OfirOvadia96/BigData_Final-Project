// https://github.com/bigmlcom/bigml-node/blob/master/docs/index.md
// https://www.dataem.com/bigml
// Don't run the all code all the time - produce a model ONCE and use for predictions from now on
// Look for an asyc version.

var bigml = require('bigml');
var fs = require("fs");

var connection = new bigml.BigML('LIORATIYA','4084760438bee80f1b62c41d3ffaeeb7f3eb7751')

var source = new bigml.Source(connection);
source.create('./bezkoder_mongodb_fs.csv', function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset(connection);
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model(connection);
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
              fs.writeFile("model.txt",modelInfo.object.resource,(err)=>{
                  if(err) return console.log(err);
                  console.log("File created!");
              })
            // console.log(modelInfo);
            // var prediction = new bigml.Prediction(connection);
            // prediction.create(modelInfo, {'petal.length': 1},function(error, prediction) { console.log(prediction.object.source);/*console.log(prediction.code)*/}); 
          }
        });
      }
    });
  }
});

// module.exports = source;