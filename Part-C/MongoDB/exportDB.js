const fs = require('fs'); 
const Collection = require('./createTable');
const Json2csvParser = require("json2csv").Parser;
const mongoose = require('mongoose');

Collection.find({}).lean().exec((err, data) => {
    if (err) throw err;
    const csvFields = ['city', 'gender', 'age','prevCalls','product','topic','totalTime']
    console.log(csvFields);
    const json2csvParser = new Json2csvParser({
        csvFields
    });
    const csvData = json2csvParser.parse(data);
    fs.writeFile("callDetails.csv", csvData, function(error) {
        if (error) throw error;
        console.log("Write to callDetails.csv successfully!");
        mongoose.connection.close();
    });
});
