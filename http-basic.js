const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Hello World!");
    res.end();
  }

  if (req.url == "/api/example") {
    res.write(JSON.stringify(new Array(2).fill("Han love Ruru!")));
    res.end();
  }
});

server.listen(3000);
console.log("Listening on port 3000...");
