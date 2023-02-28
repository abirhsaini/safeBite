const express = require('express');
const cors = require("cors")
const bodyparser = require("body-parser")
const app = express();
const routers = require("./routers/auth")

app.use(cors())

app.use(bodyparser.json())
require("./db")
require("./model/User")

app.use(routers)


app.get("/", (req, res) => { res.send("connect") })
app.listen(5000, (req, res) => { console.log("server runnong on port 5000") })