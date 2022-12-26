const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Mg Mg", age: 20 },
  { id: 2, name: "Ag Ag", age: 25 },
  { id: 3, name: "Su Su", age: 32 },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((usr) => usr.id == id);
  if (user) {
    res.json(user);
  } else {
    res.json("No found user");
  }
});

app.post("/user", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let age = req.body.age;
  //console.log("request id is", id, name, age);
  let newUser = {
    id: id,
    name: name,
    age: age,
  };
  users.push(newUser);
  res.json({ users });
});

app.patch("/user/:id", (req, res) => {
  let id = req.params.id;
  let editUser = users.find((usr) => usr.id == id);
  if (editUser) {
    editUser.name = req.body.name;
    res.json(editUser);
  } else {
    res.json({ msg: "No user found" });
  }
});

app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  users = users.filter((usr) => usr.id != id);
  res.json({ users });
});

app.listen(3000, () => {
  console.log("server is running");
});
