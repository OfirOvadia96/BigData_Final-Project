const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const controllerRouter = require('./routes/controller');


//init engine
app.set('view engine', 'ejs')

//where front files will be
app.set('views', __dirname + '/views');

//where layouts files will be
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

//where style files will be
app.use(express.static('views/public'))


app.use('/', controllerRouter);

// can set PORT to be other num (By the command: set PORT=number)
const myPort = process.env.PORT || 1000;

//(Port, Function that called when the app start listen)
app.listen(myPort, () =>  console.log(`Listening on port ${myPort} ...`)); //http://localhost:PortNumber
