const Joi = require("joi");

module.exports = {
  CatSchema: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    user: Joi.optional(),
  }),
  CommentSchema: Joi.object({
    postId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    content: Joi.string().required(),
  }),
  UserSchema: {
    RegisterSchema: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(7).max(11).required(),
      password: Joi.string().min(8).max(10).required(),
    }),
    Login: Joi.object({
      phone: Joi.string().min(7).max(11).required(),
      password: Joi.string().min(8).required(),
    }),
  },
  PostSchema: Joi.object({
    cat: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    tag: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    image: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    user: Joi.optional(),
  }),
  TagSchema: {
    add: Joi.object({
      image: Joi.string().required(),
      name: Joi.string().required(),
      user: Joi.optional(),
    }),
  },
  AllSchema: {
    id: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    page: Joi.object({
      page: Joi.number().required(),
    }),
    image: Joi.object({
      image: Joi.string().required(),
    }),
  },
};
