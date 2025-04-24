const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/post");
const authorize = require("../middleware/auth");

router.get("/", getPosts);

router.use(authorize);

router.post("/", createPost);

module.exports = router;
