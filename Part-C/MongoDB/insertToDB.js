const kafka = require('../kafka/ConsumeFromKafka/consume');
const callDetails = require('./createTable');

//------------Consumer from Kafka-----------------
kafka.consumer.on("data", (msg) => {
    const call = new callDetails(JSON.parse(msg.value));
    //Enter call details to DB
    call.save().then(() => console.log("Inserted to MongoDB"))
    .catch((err) => console.log(err));
});