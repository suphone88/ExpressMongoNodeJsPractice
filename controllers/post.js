const DB = require("../models/post");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let posts = await DB.find();
  //.populate("user cat", "-password -__v");
  Helper.fMsg(res, "All Posts", posts);
};

const get = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  //.populate("user");
  if (post) {
    Helper.fMsg(res, "Get Single Post", post);
  } else {
    next(new Error("Error, No post"));
  }
};

const post = async (req, res, next) => {
  //console.log("Request Body User", req.body.user);
  let userId = req.body.user._id;
  delete req.body.user;
  req.body.user = userId;
  let result = await new DB(req.body).save();
  Helper.fMsg(res, "Post Added", result);
};

const patch = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  if (post) {
    await DB.findByIdAndUpdate(post._id, req.body);
    let result = await DB.findById(post._id);
    Helper.fMsg(res, "Post Updated", result);
  } else {
    next(new Error("No Post with that Id"));
  }
};
const drop = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  if (post) {
    await DB.findByIdAndDelete(post._id);
    Helper.fMsg(res, "Post Deleted");
  } else {
    next(new Error("NO Post Found"));
  }
};

const byCatId = async (req, res, next) => {
  let posts = await DB.find({ cat: req.params.id }).populate("cat");
  Helper.fMsg(res, "All Post By Category", posts);
};

const byUserId = async (req, res, next) => {
  let posts = await DB.find({ user: req.params.id }).populate("user");
  Helper.fMsg(res, "All Posts By User", posts);
};

const paginate = async (req, res, next) => {
  let page = req.params.page;
  page = page == 1 ? 0 : page - 1;
  let limit = Number(process.env.POST_LIMIT);
  let skipCount = limit * page;
  let posts = await DB.find().skip(skipCount).limit(limit);
  Helper.fMsg(res, "Paginated Posts", posts);
};

module.exports = {
  all,
  get,
  post,
  patch,
  drop,
  byCatId,
  byUserId,
  paginate,
};
