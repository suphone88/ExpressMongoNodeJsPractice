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
const postRoute = require("./routes/post");
const { saveFile, saveFiles, deleteFile } = require("./utils/gallery");

// upload file
// app.post("/gallery", saveFile, (req, res, next) => {
//   res.status(200).json({ msg: "file upload", filename: req.body.image });
// });

app.post("/gallery", saveFiles, (req, res, next) => {
  res.status(200).json({ msg: "file upload", filenames: req.body.images });
});

// app.post("/gallery", async (req, res, next) => {
//   await deleteFile(req.body.name);
//   res.status(200).json({ msg: "file Deleted" });
// });

app.use("/users", userRoute);
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
