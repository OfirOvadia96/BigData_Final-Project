const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
/*
    app.get();
    app.post();
    app.put();
    app.delete();
*/
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


app.get('/', (req,res) => { //(URL || Path , Call back function)
    res.send('Our Website! Part B'); //what we send back
});


const myPort = process.env.PORT || 2000; // can set PORT to be other num (By the command: set PORT=number)

//(Port, Function that called when the app start listen)
app.listen(myPort, () =>  console.log(`Listening on port ${myPort} ...`)); // http://localhost:PortNumber
