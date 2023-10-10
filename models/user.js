module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    }
  });
  return user;
};
