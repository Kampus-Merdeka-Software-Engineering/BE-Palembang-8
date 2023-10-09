module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define("categories", {
    category_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING
    }
  });
  return category;
};


