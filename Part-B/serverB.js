const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const createClient = require("redis").createClient;
var bodyParser = require('body-parser')

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

//where layouts files will be
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.get('/', function (req, res) {
    res.redirect("/pages/dashboard.html")
})
// where style files will be
app.use('/', express.static('./views/dashboard'))


// app.use('/', controllerRouter);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/insertData.html');
})

// app.post("/", async (req, res) => {

//     const name = req.body.fname;

//     (async () => {
//         const client = createClient();

//         client.on('error', (err) => console.log('Redis Client Error', err));

//         await client.connect();

//            await client.HSET('user2', {
//                 'date': '25.01.22',
//                 'time': '09:45',
//                 'firstName': 'Dan',
//                 'lastName': 'Biton',
//                 'City': 'TLV',
//                 'gender': 'male',
//                 'age': '42',
//                 'prevCalls': '10',
//                 'topic': 'complain'
//             });

//         const obj = await client.HGETALL('user2');
//         console.log("user2: " + JSON.stringify(obj));

//         const keys = await client.keys('*');
//         console.log("keys: " + JSON.stringify(keys));

//     })();

//     res.send(name)
// });


const myPort = process.env.PORT || 2000; // can set PORT to be other num (By the command: set PORT=number)

//(Port, Function that called when the app start listen)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));
