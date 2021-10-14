const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/logout", authController.logout);

module.exports = router;
