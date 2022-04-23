const express = require('express')
const axios = require('axios')
const cors = require('cors')

const {
  client,
  getAsync,
  setAsync,
  initDatabase
} = require("../connectRedis")

const app = express()
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())
// data expiration time 
const todayEnd = new Date().setHours(23, 59, 59, 999);

//-----------functions-------------

function setExpiresTime(key) {
  // sets an expiration date for the data 
  client.expireat(key, parseInt(todayEnd / 1000));
}

async function incrementByOne(key) {
  try {
    // gets the data
    let value = await getAsync(key);
    console.log("current num: " + value);

    // increments and stores the updated data in the database
    await setAsync(key, ++value);
    console.log("update num: " + value);
    // // sets an expiration date for the data 
    // setExpiresTime(key);   

  } catch (error) {
    console.log(error);
  }
}

async function decrementByOne(key) {
  try {
    // gets the data
    let value = await getAsync(key);
    console.log("current num: " + value);

    // increments and stores the updated data in the database
    if (value > 0) {
      await setAsync(key, --value);
    } else {
      console.log("value can not be negative");
    }
    console.log("update num: " + value);
    // // sets an expiration date for the data 
    // setExpiresTime(key);   

  } catch (error) {
    console.log(error);
  }
}

//---------------------------------

app.get("/", async (req, res) => {

  // for (let i = 0; i < 20; i++) {
  //   let input;
  //   if (i % 4 == 0) input = 'addWaiting'
  //   else if (i % 3 == 1) input = 'join'
  //   else if (i % 2 == 1) input = 'complain'
  //   else input = 'ditch'

  //   // console.log(input);

  //   switch (input) {

  //     case 'addWaiting':
  //       await incrementByOne('waiting');
  //       break;

  //     case 'removeWaiting':
  //       await decrementByOne('waiting');
  //       break;

  //     case 'join':
  //       await incrementByOne('join');
  //       break;

  //     case 'complain':
  //       await incrementByOne('complain');
  //       break;

  //     case 'ditch':
  //       await incrementByOne('ditch');
  //       break;

  //     default:
  //       console.log(input + " is not recognized by thes switch case");
  //   }
  // }

})


// getting all the photos
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId
  const {
    data
  } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos", {
      params: {
        albumId
      }
    }
  )
  // res.json(data)

})

// getting an indavidual folder
app.get("/photos/:id", async (req, res) => {
  const {
    data
  } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  )

  const keyID = req.params.id

  // stores the data in the database
  client.hmset(keyID, {
    'albumId': data.albumId,
    'id': data.id,
    'title': data.title,
    'url': data.url,
    'thumbnailUrl': data.thumbnailUrl

    // verifies that the data has been successfully stored
  }, (err, reply) => {
    if (err) throw err
    console.log(reply)
  });

  // logs the data ths's been stored
  client.hgetall(keyID, (err, reply) => {
    if (err) throw err;
    console.log(reply);
  })

  // sets an expiration date for the data 
  client.expireat(keyID, parseInt(todayEnd / 1000));


  // res.json(data)
})

const myPort = process.env.PORT || 3011; // can set PORT to be other num (By the command: set PORT=number)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));