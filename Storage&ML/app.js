const express = require('express');
const app = express();
var server = require('http').createServer(app);
const controllerRouter = require('./routcontroller'); //controller
const io = require("socket.io")(server, {
   allowEIO3: true // false by default
});

var fs = require("fs");
const BigML = require('./');
//const kafka = require("../MessageBroker/ConsumeFromKafka/consume");
const mongodb = require('./models/MongoDB/mongodb');

const port = 3245
//http://localhost:3245
//--------------Middleware------------------

app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static('./views/Prediction_Table_Responsive'));
app.use(express.json());

//------------Consumer from Kafka-----------------

var newcall = "Waiting for new call...";

// io.on("connection", (socket) => {
//     kafka.consumer.on("data", (msg) => {
        
//         if(String(msg.value).includes("topic")){ //Data for MongoDB
            
//             mongodb.saveDetailCall(msg);

//         }
//         else{ //Data for predict in BigML
//             const newCall = JSON.parse(msg.value);
//             socket.emit("NewCall", 
//             {firstname: newCall.firstName, lastname: newCall.lastName, phone: newCall.phone, city: newCall.city, gender: newCall.gender, age: newCall.age, prevcalls: newCall.prevCalls});
//             newcall = msg.value;
//         }

//     });
// });


// -------- Socket.io ----------------
io.on("connection", (socket) => {

    socket.on("Train", (msg) => {  
        var res = BigML.createModel();
        setTimeout(function(){
            socket.emit("Model", res);
        }, 10000);
    });

    socket.on('Predict', (msg) => 
        {BigML.predict(newcall);
        setTimeout(function(){
            fs.readFile('predict.txt', 'utf8', function(err, data){
                socket.emit("Prediction", data);
            });
        }, 3000);
    });

});

server.listen(port, () => console.log(`BigML app listening at http://localhost:${port}`));


app.use('/', controllerRouter);