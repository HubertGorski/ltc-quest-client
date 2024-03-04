const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
const db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const extension = path.extname(file);
    const fileName = path.basename(file, extension);
    db[fileName] = require(path.join(__dirname, file))(sequelize, DataTypes);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
