const express = require('express');
const app = express();
var server = require('http').createServer(app)
const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});
// const kafka = require('./models/comsumeKafka');
const redis = require("./models/redisDB");
const { setTopic } = require('./models/redisDB');
const { join } = require('path');
const redisDB = require('./models/redisDB');
const db = require('./models/connectRedis');

const port = 3250
//http://localhost:3250
//--------------Middleware------------------

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());


// //**NEED TO INIT AFTER 24 HOURS */
// redis.initDB();

// simulation
async function simulation() {
    for (let i = 0; i < 20; i++) {
        let input;
        if (i % 4 == 0) input = 'join'
        else if (i % 3 == 1) input = 'service'
        else if (i % 2 == 1) input = 'complaint'
        else input = 'leave'
    
        await redis.setTopic(input);
    }
  }
  simulation();
  
io.on("connection", async (socket) => {
    //Get data from redis to dashboard
    let allDataArray = await redis.getAllData();
    console.log(allDataArray[0]+" | "+allDataArray[1]+" | "+allDataArray[2]+" | "+allDataArray[3]+" | "+allDataArray[4]);
    io.emit('allData', 
    // {join: allDataArray[0],service: allDataArray[1], complaint: allDataArray[2] , leave: allDataArray[3], waiting: allDataArray[4]});
    {join: await db.get('join'),service: allDataArray[1], complaint: allDataArray[2] , leave: allDataArray[3], waiting: allDataArray[4]});

});

// ------------Consumer from Kafka-----------------
// kafka.consumer.on("data", async (msg) => {
//     const newCall = JSON.parse(msg.value);

//     // **Store the data in Redis and after send to Dashboard */

//     if(newCall.length < 100) //Total wating calls
//     {
//         redis.setTopic('TotalWaiting');
//     }
//     else if(String(msg.value).includes("topic")) // Details calls
//     {   
//         redis.setTopic(newCall.topic);
//     }

//     //Get data from redis to dashboard
//     let allDataArray = await redis.getAllData();
//     io.emit('allData', 
//     {join: allDataArray[0],service: allDataArray[1], complaint: allDataArray[2] , leave: allDataArray[3], waiting: allDataArray[4]});
// });


//----------------Front side ------------------

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

//------------Consumer from Redis-----------------
var data, albumId, id, title, url, thumbnailUrl, start, end, result

const keyID = 1

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

server.listen(port, () => console.log(`Server B is listening at http://localhost:${port}`));


//** To use with controller:

// const controllerRouter = require('./routes/controller');
// app.use('/', controllerRouter);

// const express = require('express');
// const app = express();
// var server = require('http').createServer(app)
// const io = require("socket.io")(server, {
//     allowEIO3: true // false by default
// });
// const redis = require("./models/redisDB");
// const kafka = require('../MessageBroker/ConsumeFromKafka/consume');

// // const controllerRouter = require('./routes/controller');

// // const redisClient = require("./models/init_redis")
// // const expressLayouts = require('express-ejs-layouts');
// // var bodyParser = require('body-parser')

// // app.use(bodyParser.urlencoded({
// //     extended: true
// // }));

// //init engine
// app.set('view engine', 'ejs')
// //where front files will be
// app.set('views', __dirname + '/views');

// //**NEED TO INIT AFTER 24 HOURS */
// redis.initDB();

// //----------Socket.io -------------------
// io.on('connection', (socket) => {  
//     //Consumer from Kafka
//     kafka.consumer.on("data", (msg) => {
//         const newCall = JSON.parse(msg.value);
//         console.log('Consume from kafkaa!!!: ' + newCall);

//         //**Store the data in Redis and after send to Dashboard */
//         // redis.setTopic(newCall.topic);
//         // redis.setTopic('join');
//         // redis.setTopic('complaint');
//         // redis.setTopic('leave');

//         // //To frontend
//         // io.emit('newdata', newCall);
        

//     });
// });

// //----------------------------------------------

// //where layouts files will be
// // app.set('layout', 'layouts/layout');
// // app.use(expressLayouts);

// app.get('/', function (req, res) {
//     res.render(__dirname + '/views/dashboard/pages/dashboard', {
//         albumId: albumId,
//         id: id,
//         title: title,
//         url: url,
//         thumbnailUrl: thumbnailUrl
//     });
// })

// // where style files will be
// app.use('/', express.static('./views/dashboard'))

// //------------------------------------------------

// // app.use('/', controllerRouter);

// // app.get("/", (req, res) => {

// // })

// //------------Consumer from Redis-----------------
// var data, albumId, id, title, url, thumbnailUrl, start, end, result

// const keyID = 1

// // // fetches the data from the Redis database
// // redisClient.hgetall(keyID, (err, reply) => {
// //     if (err) throw err;
// //     data = JSON.stringify(reply);
// //     console.log('data:' + data);
// //     parsesDataToVariables(data)
// // })

// // parses the data into variables 
// function parsesDataToVariables(data) {
//     start = data.indexOf("albumId");
//     end = data.indexOf("id");
//     result = data.substring(start + 8, end);
//     albumId = result

//     start = end;
//     end = data.indexOf("title");
//     result = data.substring(start + 3, end);
//     id = result

//     start = end;
//     end = data.indexOf("url");
//     result = data.substring(start + 7, end);
//     title = result

//     start = end;
//     end = data.indexOf("thumbnailUrl");
//     result = data.substring(start + 4, end);
//     url = result

//     start = end;
//     end = data.length;
//     result = data.substring(start + 13, end);
//     thumbnailUrl =result
// }
// //------------------------------------------------

// // app.get('/', function(req, res) {
// // });

// const myPort = process.env.PORT || 2000; // can set PORT to be other num (By the command: set PORT=number)

// //(Port, Function that called when the app start listen)
// app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));