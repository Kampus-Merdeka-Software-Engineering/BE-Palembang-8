const dbConfig = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const createBrands = require("./create.brands.js");
const  createUser  = require("./create.users.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.brands = require("./brands.model.js")(sequelize, DataTypes, createBrands);
db.category = require("./kategori.js")(sequelize, DataTypes );
db.produk = require("./produk.model.js")(sequelize, DataTypes );

db.user = require("./user.js")(sequelize, DataTypes, createUser );



db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;