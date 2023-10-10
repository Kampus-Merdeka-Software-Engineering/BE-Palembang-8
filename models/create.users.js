module.exports = {
    up: function (queryInterface, DataTypes) {
      return queryInterface
        .createTable("users", {
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