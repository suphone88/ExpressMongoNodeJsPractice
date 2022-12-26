const DB = require("../dbs/user");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let users = await DB.find();
  Helper.fMsg(res, "All Users Testing", users);
};

const add = async (req, res, next) => {
  let saveUser = new DB(req.body);
  let result = await saveUser.save();
  Helper.fMsg(res, "Added User", result);
};
const get = async (req, res, next) => {
  let id = req.params.id;
  let user = await DB.findById(id);
  Helper.fMsg(res, "Get Single User", user);
};
const patch = async (req, res, next) => {
  let user = await DB.findById(req.params.id);
  if (user) {
    await DB.findByIdAndUpdate(user._id, req.body);
    let retUser = await DB.findById(user._id);
    Helper.fMsg(res, "User Update", retUser);
  } else {
    next(new Error("Error, Not Found"));
  }
};
const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "User Deleted");
};
module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
