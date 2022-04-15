const express = require('express');
const router = express.Router();

// var newcall;

// //------------Consumer from Kafka-----------------
// kafka.consumer.on("data", (msg) => {
//     newcall = msg.value;
// });

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