const {
    client,
    getAsync,
    setAsync
  } = require("./init-redis")

// DB keys
const keys = ["join", "service", "complaint", "leave", "waiting"];
// data expiration time 
const todayEnd = new Date().setHours(23, 59, 59, 999);

const redisDB = {

    setExpiresTime: function (key) {
        // sets an expiration date for the data 
        db.expireat(key, parseInt(todayEnd / 1000));
    },
    initDB: function() {
        keys.forEach(key => {
            setAsync(key, 0);
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
        try {
            // gets the data
            let value = await getAsync(key);
            console.log("current num: " + value);
        
            // increments and stores the updated data in the database
            await setAsync(key, ++value);
            console.log("update num: " + value);
            // // sets an expiration date for the data 
            // setExpiresTime(key);   
        
          } catch (error) {
            console.log(error);
          }
    },
    decrementByOne: async function(key) {
        try {
            // gets the data
            let value = await getAsync(key);
            console.log("current num: " + value);
        
            // increments and stores the updated data in the database
            if (value > 0) {
              await setAsync(key, --value);
            } else {
              console.log("value can not be negative");
            }
            console.log("update num: " + value);
            // // sets an expiration date for the data 
            // setExpiresTime(key);   
        
          } catch (error) {
            console.log(error);
          }
    },
    setTopic: async function(topic) {
        // we can refactor this
        console.log('topic: ' + topic);
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
                await this.incrementByOne('waiting');
                break;
            case 'decrementTotalWaiting':
                await this.decrementByOne('waiting');
                break;
            default:
                 console.log('invalid topic');
                break;
            }
    },
    getAllData: async function() {
        let allData = [];
        allData.push(await getAsync('join'));
        allData.push(await getAsync('service'));
        allData.push(await getAsync('complaint'));
        allData.push(await getAsync('leave'));
        allData.push(await getAsync('waiting'));

        return allData;
    }
}

module.exports = redisDB;