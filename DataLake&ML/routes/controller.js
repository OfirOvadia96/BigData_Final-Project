const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/', (req,res) => { //(URL || Path , Call back function)
     res.render('Prediction_Table_Responsive/index');
 });



//***************  */ -----need to check if needed ------- ***************


// const io = require("socket.io")(server);
// var fs = require("fs");
// const BigML = require('../models/bigML/bml');
// const kafka = require("../../kafka/ConsumeFromKafka/consume");
// const callDetails = require('../models/MongoDB/schemaTable');


// //------------Consumer from Kafka-----------------
// var newcall = "Waiting for new call...";

// io.on("connection", (socket) => {
//     kafka.consumer.on("data", (msg) => {
        
//         if(String(msg.value).includes("topic")){ //Data for MongoDB

//             const call = new callDetails(JSON.parse(msg.value));
//             //Enter call details to DB
//             call.save().then(() => console.log("Inserted to MongoDB"))
//             .catch((err) => console.log(err));

//         }else{ //Data for predict in BigML

//             socket.emit("NewCall", String(msg.value));
//             newcall = msg.value;
            
//         }

//     });
// });

// //---------------------------------------------

// router.get('/', (req, res) => {
//     res.render('index', {data: newcall})
// })

// //-------- Socket.io ----------------
// io.on("connection", (socket) => {

//     socket.on("Train", (msg) => {  
//         var res = BigML.createModel();
//         setTimeout(function(){
//             socket.emit("Model", res);
//         }, 10000);
//     });

//     socket.on('Predict', (msg) => 
//         {BigML.predict(newcall);
//         setTimeout(function(){
//             fs.readFile('predict.txt', 'utf8', function(err, data){
//                 socket.emit("Prediction", data);
//             });
//         }, 3000);
//     });

// });


// module.exports = router;