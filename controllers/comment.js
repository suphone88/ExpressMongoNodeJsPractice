const DB = require("../models/comment");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let comment = await DB.find({ postId: req.params.id }).select(
    "-postId, -__v"
  );
  //let comment = await DB.find();
  Helper.fMsg(res, "All Comments for Post", comment);
};

const add = async (req, res, next) => {
  let result = await new DB(req.body).save();
  Helper.fMsg(res, "Comment Added", result);
};

const drop = async (req, res, next) => {
  let dbComment = await DB.findById(req.params.id);
  if (dbComment) {
    await DB.findByIdAndDelete(dbComment._id);
    Helper.fMsg(res, "Comment Deleted");
  } else {
    next(new Error("No comment with that id"));
  }
};

module.exports = {
  all,
  add,
  drop,
};
