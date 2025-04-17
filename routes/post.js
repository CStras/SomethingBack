const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/post");

router.get("/", getPosts);
router.get("/:postId", () => console.log("Get all posts by ID"));
router.post("/", createPost);

module.exports = router;
