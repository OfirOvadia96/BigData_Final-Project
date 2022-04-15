// https://github.com/bigmlcom/bigml-node/blob/master/docs/index.md
// https://www.dataem.com/bigml
// Don't run the all code all the time - produce a model ONCE and use for predictions from now on
// Look for an asyc version.

var bigml = require('bigml');
var fs = require("fs");
require("../MongoDB/exportDB");

//var connection = new bigml.BigML('LIORATIYA','4084760438bee80f1b62c41d3ffaeeb7f3eb7751')
var connection = new bigml.BigML('OFIRRR999','bce5e228c27e09db2e07949f5943d097f110c368')
const bigML = {
  createModel: async function () {
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
                            console.log("File created!");
                        })
                    }
                    });
                }
            });
        }
    });
  }
}


// var source = new bigml.Source(connection);
// source.create('callDetails.csv', function(error, sourceInfo) {
//   if (!error && sourceInfo) {
//     var dataset = new bigml.Dataset(connection);
//     dataset.create(sourceInfo, function(error, datasetInfo) {
//       if (!error && datasetInfo) {
//         var model = new bigml.Model(connection);
//         model.create(datasetInfo, function (error, modelInfo) {
//           if (!error && modelInfo) {
//               fs.writeFile("model.txt",modelInfo.object.resource,(err)=>{
//                   if(err) return console.log(err);
//                   console.log("File created!");
//               })
//           }
//         });
//       }
//     });
//   }
// });