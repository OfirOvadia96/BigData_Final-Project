const express = require('express');
const router = express.Router();
module.exports = router;
router.get('/', (req,res) => { //(URL || Path , Call back function)
   // res.send('Our Website Part A');
    res.render('body');
});

/*
    app.get();
    app.post();
    app.put();
    app.delete();
*/