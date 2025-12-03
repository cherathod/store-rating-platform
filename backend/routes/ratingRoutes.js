const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { submitRating } = require("../controllers/ratingController");

router.post("/", auth, submitRating);

module.exports = router;
