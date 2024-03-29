require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());
app.use(fileUpload());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoute = require("./routes/user");
const catRoute = require("./routes/cat");
const tagRoute = require("./routes/tag");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

app.use("/users", userRoute);
app.use("/cats", catRoute);
app.use("/tags", tagRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

app.get("*", (req, res) => {
  res.json({ msg: "No Route Found!" });
});

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
