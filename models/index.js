const dbConfig =  require(__dirname + "/../config/config.js");
const { Sequelize, DataTypes } = require("sequelize");
const createBrands = require("./create.brands.js");
const  createUser  = require("./create.users.js");

let sequelize = new Sequelize({
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
  dialect: dbConfig.dialect,
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
db.dtproduk = require("./dt_produk.models.js")(sequelize, DataTypes );
db.user = require("./user.js")(sequelize, DataTypes, createUser );

db.category.hasMany(db.produk);
db.produk.belongsTo(db.category, {
  foreignKey: "categoryId",
  as : "category"
});

db.produk.hasMany(db.dtproduk, {
  foreignKey: "ms_produks_id",
  as : "gambar"
});
db.dtproduk.belongsTo(db.produk, {
  foreignKey: "ms_produks_id",
  as : "gambar"
});





db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;

//ini baru
// const { Sequelize } = require('sequelize');
// require('dotenv').config()

// const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
//     host: process.env.MYSQLHOST,
//     port: process.env.MYSQLPORT,
//     dialect: 'mysql',
//     logging: false
// });

// module.exports = sequelize;