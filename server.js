const jsonServer = require("json-server");
const { readFileSync } = require("node:fs");
const path = require("path");
const pause = require("connect-pause");

const server = jsonServer.create();
// in-memory db
const db = readFileSync(path.join(__dirname, "db.json"), "utf8");
const router = jsonServer.router(JSON.parse(db));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(pause(400));
server.use((req, res, next) => {
  if (req.method === "PATCH" && Math.random() < 0.5) {
    res.sendStatus(500);
  } else {
    next(); // continue to JSON Server router
  }
});
server.use(router);
server.listen(3004, () => {
  console.log("JSON Server is running");
});
