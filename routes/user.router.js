const router = require("express").Router();
const userController = require("../controller/user.controller.js");
const auth = require("../middlewares/auth.js");

router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);
router.post("/",  userController.createUser);
router.get("/",  userController.readUser);
router.put("/:id", auth, userController.upload,userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
