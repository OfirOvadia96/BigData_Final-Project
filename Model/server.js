const express = require('express');
const app = express();

app.get('/', (req,res) => { //(URL || Path , Call back function)
    res.send('Our Website!'); //what we send back
});


const myPort = process.env.PORT || 3000; // can set PORT to be other num (By the command: set PORT=new port number)

//(Port, Function that called when the app start listen)
app.listen(myPort, () =>   console.log(`Listening on port ${myPort} ...`)); 

///20:00 in video