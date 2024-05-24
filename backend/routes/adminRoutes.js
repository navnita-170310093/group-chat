const express = require("express");
const {
  editUser,
} = require("../controllers/adminControllers");
const {
  registerUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { protectAdmin } = require("../middleware/adminMiddleware");


const router = express.Router();

router.route("/").post(protect, protectAdmin,registerUser);
router.route("/edit").post(protect, protectAdmin, editUser);

module.exports = router;
