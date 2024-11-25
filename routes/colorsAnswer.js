const { Router } = require("express");
const colorController = require("../controllers/colorController");
const requireAuth = require("../middleware/requireAuth");
const router = Router();

router.use(requireAuth);

router.route("/").get(colorController.colors_get_all);

module.exports = router;
