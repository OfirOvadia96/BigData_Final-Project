const redis = require('ioredis');
const ENV_PATH =  'C:\Lioz\BigData-Final-Project\.env'
require('dotenv').config({ path: ENV_PATH})
// console.log('process.env.REDIS_AUTH: ' + process.env.REDIS_AUTH) 

const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0,
    // password: process.env.REDIS_AUTH
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
};

const redisDb = new redis(conn);
module.exports = redisDb;




