const DB = require("../dbs/user");

const all = async (req, res, next) => {
  res.status(200).json({
    con: true,
    msg: "All Users",
    result: [],
  });
};

const add = async (req, res, next) => {
  res.status(200).json({ con: true, msg: "Add User", result: [] });
};
const get = async (req, res, next) => {
  res.status(200).json({
    con: true,
    msg: "Single User",
    result: [],
  });
};
const patch = async (req, res, next) => {
  res.status(200).json({
    con: true,
    msg: "Update User",
    result: [],
  });
};
const drop = async (req, res, next) => {
  res.status(200).json({
    con: true,
    msg: "Delete User",
    result: [],
  });
};
module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
