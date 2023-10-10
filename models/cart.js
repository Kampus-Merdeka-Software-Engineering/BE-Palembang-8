module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define("cart", {
     user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: true
          },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: true
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: true
      }
    });
    return cart;
  };
  