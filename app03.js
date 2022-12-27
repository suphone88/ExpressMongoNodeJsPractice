require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

// middleware example code
const funky = (req, res, next) => {
  res.json({ msg: "Coming with get method" });
};
const isLogged = (req, res, next) => {
  if (1 + 2 == 2) {
    next();
  } else {
    next(new Error("You are not logged in"));
  }
};
const isAdmin = (req, res, next) => {
  if (5 == 5) {
    next();
  } else {
    next(new Error("Only Admin can access"));
  }
};
app.get("/users", isLogged, isAdmin, funky);

//app.use("/users", userRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(
  process.env.PORT,
  console.log(`server is running at port ${process.env.PORT} `)
);
