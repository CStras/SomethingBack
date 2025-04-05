const router = require("express").Router();

router.get("/", () => console.log("Get all users"));
router.get("/:userId", () => console.log("Get all users by ID"));
router.post("/", () => console.log("Post a new user"));

module.exports = router;
