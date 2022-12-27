const DB = require("../dbs/post");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let posts = await DB.find().populate("user", "-password -__v");
  Helper.fMsg(res, "All Posts", posts);
};

const get = async (req, res, next) => {
  let post = await DB.findById(req.params.id).populate("user");
  if (post) {
    Helper.fMsg(res, "Get Single Post", post);
  } else {
    next(new Error("Error, No post"));
  }
};

const post = async (req, res, next) => {
  let result = await new DB(req.body).save();
  Helper.fMsg(res, "Post Added", result);
};

const patch = async (req, res, next) => {
  res.json({ msg: "Patch Post" });
};
const drop = async (req, res, next) => {
  res.json({ msg: "Delete Post", id: req.params.id });
};

module.exports = {
  all,
  get,
  post,
  patch,
  drop,
};
