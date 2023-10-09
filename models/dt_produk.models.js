const {
    INTEGER
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const dtProduk = sequelize.define("dt_produk", {
        ms_produks_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: true
        },
        fieldname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: true
        },
        originalname: {
            type: DataTypes.STRING,

            allowNull: true,
            defaultValue: true
        },
        encoding: {
            type: DataTypes.STRING,

            allowNull: true,
            defaultValue: true
        },
        mimetype: {
            type: DataTypes.STRING,

            allowNull: true,
            defaultValue: true
        },
        destination: {
            type: DataTypes.STRING,


            allowNull: true,
            defaultValue: true
        },
        filename: {
            type: DataTypes.STRING,

            allowNull: true,
            defaultValue: true
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: true
        },
    });
    return dtProduk;
};