const express = require('express')
const axios = require('axios')
const cors = require('cors')
const redisClient = require("./init_redis")

// data expiration time 
const todayEnd = new Date().setHours(23, 59, 59, 999);

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
  
  let keyName = "key"

  redisClient.hmset(keyName, {
  'javascript': 'ReactJS',
  'css': 'TailwindCSS',
  'node': 'Express'
  });         
  // sets an expiration date for the data 
  redisClient.expireat(keyName, parseInt(todayEnd/1000));

  res.json(data)
})

// getting an indavidual folder
app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get( 
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  )

  redisClient.setex('photos', DEFAULT_EXPIRANTION, JSON.stringify(data))

  res.json(data)
})

const myPort = process.env.PORT || 3001; // can set PORT to be other num (By the command: set PORT=number)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));