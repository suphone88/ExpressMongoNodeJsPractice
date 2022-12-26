const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Mg Mg");
});
app.get("/users", (req, res) => {
  res.json({ name: "Mg Mg", age: 20, job: "developer" });
});
app.post("/users", (req, res) => {
  res.send("Post is sucessuful");
});
app.patch("/users/:id/:name", (req, res) => {
  let id = req.params.id;
  let name = req.params.name;
  res.status(200).json({ id, name });
});
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  res.json({ msg: "Delete id is " + id });
});
app.listen(3000, () => {
  console.log("server is running");
});
