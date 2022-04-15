// const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const mongodb = require('./models/MongoDB/consumeToMongoDB');

const app = express();
const controllerRouter = require('./routes/controller');

app.set('view engine', 'ejs')

//where front files will be
app.set('views', __dirname + '/views');

//where layouts files will be
app.set('layout', 'index');
app.use(expressLayouts);

//where style files will be
app.use(express.static('views/public'));

app.use('/', controllerRouter);

// can set PORT to be other num (By the command: set PORT=number)
const myPort = process.env.PORT || 3000;
//(Port, Function that called when the app start listen)
app.listen(myPort, () =>  console.log(`Listening on port ${myPort} : http://localhost:${myPort}`)); //http://localhost:PortNumber
