// https://github.com/bigmlcom/bigml-node/blob/master/docs/index.md
// https://www.dataem.com/bigml
// Don't run the all code all the time - produce a model ONCE and use for predictions from now on
// Look for an asyc version.

var bigml = require('bigml');
var fs = require("fs");
var mongodb = require("../MongoDB/exportDB");

var connection = new bigml.BigML('LIORATIYA','32c48e9131baa4930cb24d5f094a0e6b12d7de01')
// var connection = new bigml.BigML('OFIRRR999','bce5e228c27e09db2e07949f5943d097f110c368')

// var model_info;

var source = new bigml.Source(connection);

const BigML = {
  createModel: function () {
    mongodb.export2csv();
    
    // setTimeout(function(){
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
          }else{
            console.log(error);
          }
      })
    // }, 3000);

    return "Model created!";
  },
  predict: function (toPredict) {
    var prediction = new bigml.Prediction(connection);

    fs.readFile('model.txt', 'utf8', function(err, data){
      prediction.create(data, toPredict ,function(error, prediction) { 

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