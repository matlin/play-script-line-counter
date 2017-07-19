const express = require("express");
const app = express();
const ScriptCounter = require("./script-counter.js");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "script-counter", "build")));

app.get("/", function(req, res) {
  res.sendFile(
    path.resolve(__dirname, "script-counter", "build", "index.html")
  );
});

app.use("/api/");

app.get("/api/analyze/:url", (req, res) => {
  let url = req.params.url;
  ScriptCounter.analyze(url).then(analysis => {
    res.send(analysis);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
