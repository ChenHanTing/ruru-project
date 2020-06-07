const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/hello", (req, res) => {
  res.send(new Array(2).fill("Ruru love Han!"));
});

app.get("/api/example", (req, res) => {
  res.send(new Array(2).fill("Han love Ruru!"));
});

app.listen(3100, () => {
  console.log("Listening on port 3100...");
});
