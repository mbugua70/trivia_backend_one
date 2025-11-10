const { Router } = require("express");
const colorController = require("../controllers/colorController");
const router = Router();

router.route("/").get(colorController.colors_get_all);

module.exports = router;
