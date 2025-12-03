const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createStore, getAllStores, getStoreRatings } = require("../controllers/storeController");

router.post("/", auth, role("admin"), createStore);
router.get("/", auth, getAllStores);
router.get("/:id/ratings", auth, role("store_owner"), getStoreRatings);

module.exports = router;
