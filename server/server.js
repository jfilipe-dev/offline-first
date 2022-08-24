const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.post("/notes", (req, res, next) => {
  req.body.id = req.body.id || uuidv4();
  req.body.content = req.body.content || "";
  req.body.deleted = false;

  next();
});

server.get("/notes", (req, res, next) => {
  const notes = db.get("notes").value();
  const data = notes.filter((note) => !note.deleted);

  res.json(data);
});

server.get("/sync", (req, res, next) => {
  const db = router.db;

  const notes = db.get("notes").value();

  const data = notes.filter((note) => !note.deleted);
  const deleted = notes.filter((note) => note.deleted).map((note) => note.id);

  res.json({ data, deleted });
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
