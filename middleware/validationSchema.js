const Joi = require("joi");

const signUpSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required(),
  password: Joi.string().required(),
  roleID: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,16}$")).required(),
});

module.exports = { signUpSchema, loginSchema };
