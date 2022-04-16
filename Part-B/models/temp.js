const express = require('express')
const client = require("./init_redis")

client.set("foo", "bar")

client.get("foo", (err, value) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log(value);
    }
})

const app = express()

const myPort = process.env.PORT || 6000; // can set PORT to be other num (By the command: set PORT=number)
app.listen(myPort, () => console.log(`Listening on http://localhost:${myPort}`));