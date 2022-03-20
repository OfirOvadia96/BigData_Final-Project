// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "tricycle-01.srvs.cloudkafka.com:9094,tricycle-02.srvs.cloudkafka.com:9094,tricycle-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "r32sn9cb",
  "sasl.password": "VZhZOhNE7ItIQycfyTxj2iQ-rdApVl2W",
  "debug": "generic,broker,security"
};

const prefix = "r32sn9cb-";
const topic = `${prefix}new`;
// const producer = new Kafka.Producer(kafkaConf);

// const genMessage = m => new Buffer.alloc(m.length,m);
// //const prefix = process.env.CLOUDKARAFKA_USERNAME;

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", (err) => {
  console.error(err);
});

consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
 console.log(m.value.toString());
});

consumer.on("disconnected", (arg)=> {
  process.exit();
});
consumer.on('event.error', (err)=> {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
  console.log(log);
});
consumer.connect();

module.exports.consumer = consumer;