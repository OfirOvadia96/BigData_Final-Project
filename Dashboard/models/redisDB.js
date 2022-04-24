const db = require('./connectRedis');

// DB keys
const keys = ["join", "service", "complaint", "leave", "waiting","averageTime"];
// data expiration time 
const todayEnd = new Date().setHours(23, 59, 59, 999);

const redisDB = {

    setExpiresTime: function (key) {
        // sets an expiration date for the data 
        db.expireat(key, parseInt(todayEnd / 1000));
    },
    initDB: async function() {
        keys.forEach(key => {
            db.set(key, 0);
        });
        console.log('initDB');
    },
    setExpiresTimeForAllKeys: function () {
        keys.forEach(key => {
            this.setExpiresTime(key);
        });
        console.log('setExpiresTimeForAllKeys');
    },
    incrementByOne: async function(key){
        console.log('************************');
        try {
            // check if the key exists
            const exists = await db.exists(key);
            console.log('exists: ' + exists)

            if(!exists) {
               // init the key and increaments
               const bool = await db.set(key, 1);  
               console.log('bool: ' + bool)
               const existsNow = await db.exists(key);
               console.log(`updated ${key} number: ` + 1);
               console.log('existsNow: ' + existsNow)
            }

            else { //exists
                // gets the data
                let value = await db.get(key);
                console.log("current num: " + value);
        
                // increments and stores the updated data in the database
                await db.set(key, ++value);
                console.log(`updated ${key} number: ${value}`);
            }

            // sets an expiration date for the data 
            this.setExpiresTime(key);
            console.log('set an expiration date'); 
        
        } catch (error) {
            console.log(error);
        }
    },

    setWaiting: async function(key, value){
        try {
            // stores the data in the database
            await db.set(key, value);
            console.log(`updated ${key} number: ${value}`);

            // // sets an expiration date for the data 
            // this.setExpiresTime(key);
            // console.log('set an expiration date'); 
        
        } catch (error) {
            console.log(error);
        }
    },
    setTopic: async function(topic, value) {
        // we can refactor this
        switch(topic) {
            case 'join':
                await this.incrementByOne('join');
                break;
            case 'service':
                await this.incrementByOne('service');
                break;
            case 'complaint':
                await this.incrementByOne('complaint');
                break;
            case 'leave':
                await this.incrementByOne('leave');
                break;
            case 'TotalWaiting':
                await this.setWaiting('waiting', value);
                break;
            default:
                console.log('invalid topic');
                break;
            }
    },
    getAllData: async function() {
        let allData = [];
        allData.push(await db.get('join'));
        allData.push(await db.get('service'));
        allData.push(await db.get('complaint'));
        allData.push(await db.get('leave'));
        allData.push(await db.get('waiting'));
        console.log("Get all data from Redis!");
        return allData;
    },
    setAverageTime: async function(totaltime) {
        // check if the key exists
        const exists = await db.exists("averageTime");

        if(!exists) {
            // init the key
            db.set("averageTime", 0);  
        }
       
        let value = await db.get("averageTime");
        await db.set("averageTime", value + totaltime);
    },
    getAverageTime: async function() {
        // check if the key exists
        const exists = await db.exists("averageTime");

        if(!exists) {
            // init the key
            return 0; 
        }
       
        let totalTime = await db.get("averageTime");
        let calls = await db.get("join") + await db.get("service") + await db.get("complaint") + await db.get("leave");
        
        return (totalTime/calls)/60;
    },
}

module.exports = redisDB;