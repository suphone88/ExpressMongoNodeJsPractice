const all = async (req, res, next) => {
  res.json({ msg: "All Posts" });
};

const get = async (req, res, next) => {
  res.json({ msg: "Single Post" });
};

const post = async (req, res, next) => {
  res.json({ msg: "Add New Post", result: req.body });
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
