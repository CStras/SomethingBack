const router = require("express").Router();

router.get("/", () => console.log("Get all posts"));
router.get("/:postId", () => console.log("Get all posts by ID"));
router.post("/", () => console.log("Post a new post"));

module.exports = router;
