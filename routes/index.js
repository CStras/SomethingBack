const router = require("express").Router();
const usersRouter = require("./users");
const postsRouter = require("./post");
const { login, createUser } = require("../controllers/users");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../middleware/validation");

router.post("/signup", validateRegisterBody, createUser);
router.post("/signin", validateLoginBody, login);

router.use("/posts", postsRouter);
router.use("/users", usersRouter);

module.exports = router;
