const express = require("express");
const { Router } = require("express");
const userAuthController = require("../controllers/userAuthController");
const router = Router();


// signup routes

router.post("/signup", userAuthController.signUpUser);
router.patch("/signup/:id", userAuthController.player_update);
router.get("/all", userAuthController.getAllPlayers);
module.exports = router;
