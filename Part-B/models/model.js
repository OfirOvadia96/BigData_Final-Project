const express = require('express')
const axios = require('axios')
const cors = require('cors')
const redisClient = require("./init_redis")

const DEFAULT_EXPIRANTION = 30 // 30 sex

// const todayEnd = new Date().setHours(23, 59, 59, 999);
// redisClient.expireat("example", parseInt(todayEnd/1000));

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// getting all the photos
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    { params: { albumId }}
  )
  
  redisClient.set('example', "example_changed");
  // redisClient.setex('photos', DEFAULT_EXPIRANTION, JSON.stringify(data))

  res.json(data)
})

// getting an indavidual folder
app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get( 
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  )

  redisClient.set('specific', "specific_changed");

  res.json(data)
})

const myPort = process.env.PORT || 3000; // can set PORT to be other num (By the command: set PORT=number)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));