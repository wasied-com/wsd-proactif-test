module.exports = {
  list: (_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify([]));
  },
};
