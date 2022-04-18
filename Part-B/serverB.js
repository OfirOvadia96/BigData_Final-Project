const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser')
const redisClient = require("./models/init_redis")
const socketIO = require('socket.io');
const io = socketIO(server);
// const kafka = require('../kafka/ConsumeFromKafka/consume');

const controllerRouter = require('./routes/controller');
const {
    string
} = require('joi');
const send = require('send');

const DEFAULT_EXPIRANTION = 3600; // one hour

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

//init engine
app.set('view engine', 'ejs')

//where front files will be
app.set('views', __dirname + '/views');

//----------Socket.io -------------------
io.on('connection', (socket) => {  
    //Consumer from Kafka
    kafka.consumer.on("data", (msg) => {

      socket.on('newdata', (msg) => {
        console.log(msg);
        io.emit('newdata', msg);
      });
        // let massage = JSON.parse(msg.value);
        // console.log(massage);

    });
});

//----------------------------------------------

//where layouts files will be
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.get('/', function (req, res) {
    res.render(__dirname + '/views/dashboard/pages/dashboard', {
        albumId: albumId,
        id: id,
        title: title,
        url: url,
        thumbnailUrl: thumbnailUrl
    });
})
// where style files will be
app.use('/', express.static('./views/dashboard'))

//------------------------------------------------

// app.use('/', controllerRouter);

// app.get("/", (req, res) => {

// })

//------------Consumer from Redis-----------------
var data, albumId, id, title, url, thumbnailUrl, start, end, result

const keyID = 1

// // fetches the data from the Redis database
// redisClient.hgetall(keyID, (err, reply) => {
//     if (err) throw err;
//     data = JSON.stringify(reply);
//     console.log('data:' + data);
//     parsesDataToVariables(data)
// })

// parses the data into variables 
function parsesDataToVariables(data) {
    start = data.indexOf("albumId");
    end = data.indexOf("id");
    result = data.substring(start + 8, end);
    albumId = result

    start = end;
    end = data.indexOf("title");
    result = data.substring(start + 3, end);
    id = result

    start = end;
    end = data.indexOf("url");
    result = data.substring(start + 7, end);
    title = result

    start = end;
    end = data.indexOf("thumbnailUrl");
    result = data.substring(start + 4, end);
    url = result

    start = end;
    end = data.length;
    result = data.substring(start + 13, end);
    thumbnailUrl =result
}
//------------------------------------------------

// app.get('/', function(req, res) {
// });

const myPort = process.env.PORT || 2000; // can set PORT to be other num (By the command: set PORT=number)

//(Port, Function that called when the app start listen)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));