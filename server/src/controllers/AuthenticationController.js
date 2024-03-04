const { User } = require("../models/");
// const jwt = require("jsonwebtoken");
// const config = require("../config/config");

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      res.send(userJson);
    } catch (err) {
      res.status(400).send({
        error: "This login account is already in use.",
      });
    }
  },
};
