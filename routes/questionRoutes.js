const { Router } = require("express");
const authController = require("../controllers/authController");
const requireAuth = require("../middleware/requireAuth");
const router = Router();

// routers children

// Get All Workouts
router.get("/", authController.question_get_all);

module.exports = router;
