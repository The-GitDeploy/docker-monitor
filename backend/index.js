const Dockerode = require('dockerode');
var express = require('express');
var app = express();

app.use("/", express.static("built_frontend"))

const { SyncedServer } = require('express-sync-state');
const state = { containers: [] }

app.get("/state", (req, res, next) => {
  if (process.env.NODE_ENV === "development")
    res.header("Access-Control-Allow-Origin", "*");
  next()
}, SyncedServer(state))

const docker = new Dockerode();

setInterval(() => {
  docker.listContainers((err, list) => {
    if (err)
      console.log(err)
    state.containers = list
  })
}, 2000)


app.listen(8080, "0.0.0.0", () => {
  console.log("Listening under 0.0.0.0:8080");
})