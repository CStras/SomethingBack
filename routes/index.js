const router = require("express").Router();
const usersRouter = require("./users");
const postsRouter = require("./post");
const { login, createUser } = require("../controllers/users");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../middleware/validation");
const NotFoundError = require("../constructors/not-found-err");

router.post("/signup", validateRegisterBody, createUser);
router.post("/signin", validateLoginBody, login);

router.use("/posts", postsRouter);
router.use("/users", usersRouter);

router.use((req, res, next) =>
  next(new NotFoundError("Requested resource not found"))
);

module.exports = router;
