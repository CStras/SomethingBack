const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const BadRequestError = require("../constructors/bad-request-err");
const ConflictError = require("../constructors/conflict-err");
const NotFoundError = require("../constructors/not-found-err");
const UnauthorizedError = require("../constructors/unauth-err");
const { REQUEST_CREATED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: 3600,
      });

      res.send({ token });
    })
    .catch((err) => {
      if (err.message.includes("Incorrect email or password")) {
        return next(new UnauthorizedError("Incorrect email or password"));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email is already in use."));
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("Email is already in use.");
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({ name, avatar, email, password: hash }).then((data) => {
          res
            .status(REQUEST_CREATED)
            .setHeader("Content-Type", "application/json")
            .send({
              name: data.name,
              email: data.email,
              avatar: data.avatar,
            });
        });
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      if (err.message === "Email already in use") {
        return next(
          new ConflictError("An account exists already with this email")
        );
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req?.user?._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Could not find the items"));
      }

      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

module.exports = { createUser, getUserById, login };
