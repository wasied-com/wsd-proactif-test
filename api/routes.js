const unavailables = require("./controllers/UnavailablesController");

module.exports = {
  "/health": (_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, database: Boolean(process.env.DATABASE_URL) }));
  },
  "/unavailables": unavailables.list,
};
