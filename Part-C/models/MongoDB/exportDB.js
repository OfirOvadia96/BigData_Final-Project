const fs = require('fs'); 
const Collection = require('./schemaTable');
const Json2csvParser = require("json2csv").Parser;
const mongoose = require('mongoose');

const MongoDB = {
    export2csv: function () {
        Collection.find({},{_id:0}).lean().exec((err, data) => {
            if (err) throw err;
            const csvFields = ['id','firstName','lastName','phone','city', 'gender', 'age','prevCalls','totalTime','product','topic']
            console.log(csvFields);
            const json2csvParser = new Json2csvParser({
                csvFields
            });
            const csvData = json2csvParser.parse(data);
            fs.writeFile("callDetails.csv", csvData, function(error) {
                if (error) throw error;
                console.log("Write to callDetails.csv successfully!");
            });
        });
    }
}

module.exports = MongoDB;
