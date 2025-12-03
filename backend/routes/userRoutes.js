const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getAllUsers, createUser, updatePassword } = require("../controllers/userController");

router.get("/", auth, role("admin"), getAllUsers);
router.post("/", auth, role("admin"), createUser);
router.put("/password", auth, updatePassword);

module.exports = router;
