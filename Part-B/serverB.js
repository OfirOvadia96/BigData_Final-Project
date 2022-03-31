const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const createClient = require("redis").createClient;
var bodyParser = require('body-parser')

const controllerRouter = require('./routes/controller');

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
//where style files will be
app.use('/',express.static('./views/dashboard'))




// app.use('/', controllerRouter);


// app.get('/', (req, res) => { //(URL || Path , Call back function)
//     // res.send('Our Website! Part B'); //what we send back
//     res.sendFile(__dirname + "/views/dashboard/pages/dashboard.html"); 
// });


app.post("/", async (req, res) => {

    const name = req.body.fname;

    (async () => {
        const client = createClient();

        client.on('error', (err) => console.log('Redis Client Error', err));

        await client.connect();

        await client.LPUSH('names', name);
        const value = await client.lRange('names', 0, -1);
        console.log("value: " + value);
    })();

    res.send(name)
});

const myPort = process.env.PORT || 2000; // can set PORT to be other num (By the command: set PORT=number)

//(Port, Function that called when the app start listen)
app.listen(myPort, () => console.log(`Listening on port ${myPort} ...`)); // http://localhost:PortNumber