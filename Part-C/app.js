const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
var fs = require("fs");
const BigML = require('./models/bml');
const kafka = require("../kafka/ConsumeFromKafka/consume");
const mongodb = require('./models/MongoDB/mongodb');

const port = 3245

//--------------Middleware------------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

//------------Consumer from Kafka-----------------

var newcall = "Waiting for new call...";

io.on("connection", (socket) => {
    kafka.consumer.on("data", (msg) => {
        
        if(String(msg.value).includes("topic")){ //Data for MongoDB

            mongodb.saveDetailCall(msg);

        }else{ //Data for predict in BigML

            socket.emit("NewCall", String(msg.value));
            newcall = msg.value;
            
        }

    });
});

//----------------Front side ------------------

app.get('/', (req, res) => {
    res.render('index', {data: newcall})
})

//-------- Socket.io ----------------
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


//** To use with controller:

// const controllerRouter = require('./routes/controller');
// app.use('/', controllerRouter);