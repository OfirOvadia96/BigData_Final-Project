const redis = require('redis')
const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0,
    // password: process.env.REDIS_AUTH
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
};
const client = redis.createClient(conn)
const {
    promisify
} = require('util');

client.on('error', (err) => {
    console.log(err.message)
})

client.on('connect', () => {
    console.log("Client connected to redis...")
})

client.on('ready', () => {
    console.log("Client connected to redis and ready to user...")
})


client.on('end', () => {
    console.log("\nClient disconnected from redis")
})

// process.on('SIGINT', () => {
//     client.quit()
// })


//------------------exports-functions------------------ 

module.exports.setAsync = promisify(client.set).bind(client);
module.exports.getAsync = promisify(client.get).bind(client);
// module.exports.initDatabase = initDatabase;
