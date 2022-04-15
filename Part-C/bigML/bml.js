// https://github.com/bigmlcom/bigml-node/blob/master/docs/index.md
// https://www.dataem.com/bigml
// Don't run the all code all the time - produce a model ONCE and use for predictions from now on
// Look for an asyc version.

var bigml = require('bigml');
var fs = require("fs");
require("../MongoDB/exportDB");

var connection = new bigml.BigML('OFIRRR999','bce5e228c27e09db2e07949f5943d097f110c368')

var source = new bigml.Source(connection);
source.create('../MongoDB/callDetails.csv', function(error, sourceInfo) {
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
          }
        });
      }
    });
  }
});

// module.exports = source;