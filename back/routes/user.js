const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// route connexion
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// route utilisateur
router.get("/user-profile/:userId", userCtrl.getOneUser);

module.exports = router;
