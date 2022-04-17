const express = require('express');
// const app = express();
const router = express.Router();
var server = require('http').createServer(router);
const io = require("socket.io")(server);
const BigML = require('../models/bigML/bml');

// var newcall;

// //------------Consumer from Kafka-----------------
// kafka.consumer.on("data", (msg) => {
//     newcall = msg.value;
// });

//------------ Socket.io ----------------
io.on("connection", (socket) => {
    socket.on('Train', (msg) => { 
        // BigML.createModel(); 
        console.log(msg);
    });

    socket.on('Predict', async (msg) => 
    {var prediction = BigML.predict({"id": "4591928","firstName": "Joy","lastName": "Goodwin","phone": "(555)","city": "Ashkelon","gender": "Female","age": 23,"prevCalls": 10,"totalTime": 50.946})
    socket.emit("prediction", prediction);
    });
});

//---------------------------------------------

router.get('/', (req,res) => { //(URL || Path , Call back function)
   // res.send('Our Website Part A');
    res.render('index',{data: "newcall"});
});

/*
    app.get();
    app.post();
    app.put();
    app.delete();
*/

module.exports = router;