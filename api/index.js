const http = require("node:http");
const routes = require("./routes");

const port = Number(process.env.PORT || 3000);
http
  .createServer((req, res) => {
    const handler = routes[req.url] || routes["/health"];
    handler(req, res);
  })
  .listen(port, () => {
    console.log(`api en ecoute sur ${port} (NODE_ENV=${process.env.NODE_ENV || "absent"})`);
  });
