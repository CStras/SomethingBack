const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", () => console.log("Get all users by ID"));
router.post("/", () => console.log("Post a new user"));

module.exports = router;
