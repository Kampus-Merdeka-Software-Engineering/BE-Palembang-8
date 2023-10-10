module.exports = {
    up: function (queryInterface, DataTypes) {
      return queryInterface
        .createTable("cart", {
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
        })
        .then(() => {
          console.log("created user table");
        });
    },
    down: function (queryInterface, DataTypes) {
      return queryInterface.dropTable("user").then(() => {
        console.log("user table dropped");
      });
    }
  };