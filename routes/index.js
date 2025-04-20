const router = require("express").Router();
const usersRouter = require("./users");
const postsRouter = require("./post");
const { login } = require("../controllers/users");

router.post("/signin", login);

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;
