const db = require('./connectRedis');

const redisDB = {
    initDB: async function() {
        db.set('join', 0);
        db.set('service', 0);
        db.set('complaint', 0);
        db.set('leave', 0);
        db.set('waiting', 0);
    },
    incrementByOne: async function(key){
        try {
            // gets the data
            let value = await db.get(key);
            console.log("current num: " + value);
        
            // increments and stores the updated data in the database
            await db.set(key, ++value);
            console.log(`updated ${key} number: ${value}`);

            // // sets an expiration date for the data 
            // setExpiresTime(key);   
        
        } catch (error) {
            console.log(error);
        }
    },
    decrementByOne: async function(key) {
        try {
            // gets the data
            let value = await db.get(key);
            console.log("current num: " + value);
        
            // increments and stores the updated data in the database
            if (value > 0) {
                await db.set(key, --value);
            } else {
              console.log("value can not be negative");
            }
            console.log(`updated ${key} number: ${value}`);
            // // sets an expiration date for the data 
            // setExpiresTime(key);   
        
          } catch (error) {
            console.log(error);
          }
    },
    setTopic: async function(topic) {
        switch(topic) {
            case 'join':
                this.incrementByOne('join');
                break;
            case 'service':
                this.incrementByOne('service');
                break;
            case 'complaint':
                this.incrementByOne('complaint');
                break;
            case 'leave':
                this.incrementByOne('leave');
                break;
            case 'TotalWaiting':
                this.incrementByOne('waiting');
                break;
            case 'decrementTotalWaiting':
                this.decrementByOne('waiting');
                break;
            default:
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

        return allData;
    }
}

module.exports = redisDB;