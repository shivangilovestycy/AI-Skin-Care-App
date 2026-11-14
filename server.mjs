import http from "node:http";

const port = Number(process.env.PORT || 3000);

http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Mira API Server");
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));
