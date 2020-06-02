const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("HELLO WORLD");
    res.end();
  }
});

server.listen(3001);

console.log("Listening on port 3001...");
