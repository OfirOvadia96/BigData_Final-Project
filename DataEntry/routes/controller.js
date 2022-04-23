const express = require('express');
const router = express.Router();
//var db = require('../models/mysql');


router.get('/', (req, res) => { //(URL || Path , Call back function)
    //Call Generator of users from MySQL
  //  db.query("SELECT * FROM users;", function (err, result, fields) {
      //  if (err) throw err;
        res.render('index' /*,{data: result}*/)
    });
//})

router.get('/new', (req, res) => { //(URL || Path , Call back function)
    //Call Generator of users from MySQL
  //  db.query("SELECT * FROM users;", function (err, result, fields) {
      //  if (err) throw err;
        res.render('Calls_Table_Responsive/indexNew' /*,{data: result}*/)
    });
//})

module.exports = router;