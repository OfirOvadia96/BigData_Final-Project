const redis = require('redis');
const {
    promisify
} = require('util');

const runApplication = async () => {
    // Connect to redis at 127.0.0.1 port 6379 no password.
    const client = redis.createClient();

    const setAsync = promisify(client.set).bind(client);
    const getAsync = promisify(client.get).bind(client);

    await setAsync('foo', 'bar');
    const fooValue = await getAsync('foo2');
    console.log(fooValue);

};

runApplication();