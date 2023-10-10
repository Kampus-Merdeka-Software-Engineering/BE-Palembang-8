const router = require("express").Router();
const cartController = require("../controller/cart.js");

router.post("/add", cartController.createCart);

module.exports = router;
