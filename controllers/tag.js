const DB = require("../models/tag");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let tags = await DB.find();
  Helper.fMsg(res, "All Tags", tags);
};

const add = async (req, res, next) => {
  let dbTag = await DB.findOne({ name: req.body.name });
  if (dbTag) {
    next(new Error("Tag name is already in use"));
  } else {
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Tag Created ", result);
  }
};

const get = async (req, res, next) => {
  let result = await DB.findById(req.params.id);
  if (result) {
    Helper.fMsg(res, "Single Tag", result);
  } else {
    next(new Error("No Tag with that Id"));
  }
};

const patch = async (req, res, next) => {
  let result = await DB.findById(req.params.id);
  if (result) {
    await DB.findByIdAndUpdate(req.params.id);
    let updateTag = await DB.findById(req.params.id);
    Helper.fMsg(res, "Tag Updated", updateTag);
  } else {
    next(new Error("No Tag with that Id"));
  }
};
const drop = async (req, res, next) => {
  let result = await DB.findById(req.params.id);
  if (result) {
    await DB.findByIdAndDelete(result._id);
    Helper.fMsg(res, "Tag Deleted");
  } else {
    next(new Error("No Tag with that Id"));
  }
};
module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
