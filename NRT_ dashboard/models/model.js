const express = require('express')
const axios = require('axios')
const cors = require('cors')
const {
  client,
  getAsync,
  setAsync
} = require("./init_redis")

const app = express()
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())
// data expiration time 
const todayEnd = new Date().setHours(23, 59, 59, 999);

//-----------functions-------------
async function incrementByOne(key) {
  try {
    // gets the data
    let value = await getAsync(key);
    console.log("current num: " + value);

    // increments and stores the updated data in the database
    await setAsync(key, ++value);
    console.log("update num: " + value);
  } catch (error) {
    console.log(error);
  }
}
//---------------------------------

app.get("/", async (req, res) => {

  for (let i = 0; i < 20; i++) {
    let input;
    if (i % 4 == 0) input = 'waiting'
    else if (i % 3 == 1) input = 'join'
    else if (i % 2 == 1) input = 'complain'
    else input = 'ditch'

    // console.log(input);

    switch (input) {

      case 'waiting':
        await incrementByOne('waiting');
        break;

      case 'join':
        await incrementByOne('join');
        break;

      case 'complain':
        await incrementByOne('complain');
        break;

      case 'ditch':
        await incrementByOne('ditch');
        break;

      default:
        console.log(input + " is not recognized by thes switch case");
    }
  }

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

const myPort = process.env.PORT || 3009; // can set PORT to be other num (By the command: set PORT=number)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));

// module.exports = client