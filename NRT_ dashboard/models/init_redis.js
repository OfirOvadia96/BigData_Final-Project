const redis = require('redis')
// Connect to redis at 127.0.0.1 port 6379 no password.
const client = redis.createClient()
const {
    promisify
} = require('util');

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


//------------------sets-database------------------ 

const initDatabase = async () => {
    const setAsync = promisify(client.set).bind(client);
    const getAsync = promisify(client.get).bind(client);

    await setAsync('waiting', 0);

    await setAsync('join', 0);

    await setAsync('complain', 0);

    await setAsync('ditch', 0);
};

initDatabase();

//------------------exports-functions------------------ 

module.exports.setAsync = promisify(client.set).bind(client);
module.exports.getAsync = promisify(client.get).bind(client);

