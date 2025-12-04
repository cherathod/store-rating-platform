const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");

// Middlewares
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Validation
const {
  validateSubmitRating,
} = require("../validations/rating.validation");

/**
 * @route POST /api/ratings
 * @desc Submit a rating for a store (user)
 */
router.post(
  "/",
  auth, // must be logged in
  role("user"), // only normal users can rate stores
  validateSubmitRating,
  ratingController.submitRating
);

/**
 * @route GET /api/ratings/my
 * @desc Get all ratings submitted by the logged-in user
 */
router.get(
  "/my",
  auth,
  role("user"),
  ratingController.getMyRatings
);

/**
 * @route GET /api/ratings/store/:storeId
 * @desc Get all ratings of a specific store (store owner OR admin)
 */
router.get(
  "/store/:storeId",
  auth,
  role("store_owner", "admin"),
  ratingController.getStoreRatings
);

/**
 * @route GET /api/ratings
 * @desc Admin: get every rating in the system
 */
router.get(
  "/",
  auth,
  role("admin"),
  ratingController.getAllRatings
);

module.exports = router;
