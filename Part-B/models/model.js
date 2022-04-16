const express = require('express')
const axios = require('axios')
const cors = require('cors')
const redisClient = require("./init_redis")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// data expiration time 
const todayEnd = new Date().setHours(23, 59, 59, 999);


// getting all the photos
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    { params: { albumId }}
  )
  res.json(data)
})

// getting an indavidual folder
app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get( 
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  )

    const keyID = req.params.id

    redisClient.hmset(keyID, {
      'albumId': data.albumId,
      'id': data.id,
      'title': data.title,
      'url': data.url,
      'thumbnailUrl': data.thumbnailUrl
     });         

  // sets an expiration date for the data 
  redisClient.expireat(keyID, parseInt(todayEnd/1000));

  res.json(data)
})

const myPort = process.env.PORT || 3005; // can set PORT to be other num (By the command: set PORT=number)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));