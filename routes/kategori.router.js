const router = require('express').Router()

const kategoriController = require("../controller/kategori.controller.js")
const auth = require("../middlewares/auth.js");

router.post("/",  kategoriController.upload, kategoriController.createCategory);
router.get("/", kategoriController.readCategory);
router.put("/:id",  kategoriController.upload, kategoriController.updateCategory);
router.delete("/:id",  kategoriController.deleteCategory);

module.exports = router;
