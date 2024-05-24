const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  allUsersList
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { protectAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/user-list").get( allUsersList);
router.route("/").post(protectAdmin,registerUser);
router.post("/login", authUser);

module.exports = router;
