const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.post("/notes", (req, res, next) => {
  req.body.id = uuidv4();
  req.body.content = "";

  next();
});

// server.get("/sync", (req, res, next) => {
//   const db = router.db;

// get notes by updated_at
//   const notes = db.get("notes").value();
//   res.json(notes);
// });

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
