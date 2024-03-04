module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rank: {
      type: DataTypes.STRING,
      defaultValue: "Participant",
    },
    teamId: {
      type: DataTypes.INTEGER,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
