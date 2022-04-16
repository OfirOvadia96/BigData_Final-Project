const redis = require('redis')
const client = redis.createClient()

client.on('connect', () => {
    console.log("Client connected to redis...")
})

client.on('ready', () => {
    console.log("Client connected to redis and ready to user...")
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log("\nClient disconnected from redis")
})

process.on('SIGINT', () => {
    client.quit()
})


module.exports = client

