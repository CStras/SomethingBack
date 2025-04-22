const router = require("express").Router();
const { getUserById } = require("../controllers/users");
const authorize = require("../middleware/auth");

router.use(authorize);

router.get("/me", getUserById);

module.exports = router;
