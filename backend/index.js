const Dockerode = require('dockerode');
var express = require('express');
const { SyncedServer } = require('express-sync-state');

const state = { containers: [] }
const docker = new Dockerode();
setInterval(() => {
  docker.listContainers((err, list) => {
    if (err)
      console.log(err)
    state.containers = list
  })
}, 2000)


var app = express();
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development")
    res.header("Access-Control-Allow-Origin", "*");
  next()
})
app.use("/", express.static("built_frontend"))

app.get("/state", SyncedServer(state))

app.get("/log/:container", (req, res) => {

  const container = docker.getContainer(req.params.container)

  if(!container)
    res.status(400).end()

  res.header('Cache-Control', 'no-cache')

  var savedStream

  res.write("\n")

  container.logs({follow: true, stdout: true, stderr: true, tail: "10000"}, function (err, stream) {
    savedStream = stream
    stream.pipe(res)
  });

  res.socket.on('end', function () {
    if(savedStream && !savedStream.destroyed)
      savedStream.destroy()
  })

})



app.listen(8080, "0.0.0.0", () => {
  console.log("Listening under 0.0.0.0:8080");
})