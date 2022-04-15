const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/', (req,res) => { //(URL || Path , Call back function)
    res.render('index');
});

/*
    app.get();
    app.post();
    app.put();
    app.delete();
*/