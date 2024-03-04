const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      login: Joi.string().min(3).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "login":
          res.status(400).send({
            error: "You must provide a valid login",
          });
          break;
        case "password":
          res.status(400).send({
            error: "You must provide a valid password",
          });
          break;
      }
    } else {
      next();
    }
  },
};
