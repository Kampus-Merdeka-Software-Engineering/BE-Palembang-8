const db = require("../models");
const multer = require("multer");
const path = require("path");

const cart = db.cart;

const createCart = async (req, res) => {
    try{

    let info = {
      user_id: req.body.user_id,
      name: req.body.name,
      price: req.body.price,
    };

    const carts = await cart.create(info);
    res.status(201).json({
      message: "Berhasil Memasukkan ke Cart",
      cart: carts
    });
    console.log(carts);
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
  };

  module.exports = {
    createCart
};