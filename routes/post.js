const router = require("express").Router();
const { getPosts, createPost, deletePost } = require("../controllers/post");
const authorize = require("../middleware/auth");

router.get("/", getPosts);

router.use(authorize);

router.delete("/:itemId", deletePost);

router.post("/", createPost);

module.exports = router;
