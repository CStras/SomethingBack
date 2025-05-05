const Post = require("../models/post");
const { REQUEST_CREATED } = require("../utils/errors");
const BadRequestError = require("../constructors/bad-request-err");

const getPosts = (req, res, next) => {
  Post.find({})
    .then((items) => {
      res.send(items);
    })
    .catch(next);
};

const createPost = (req, res, next) => {
  const { title, author, date, description, url } = req.body;
  Post.create({ title, author, date, description, url })
    .then((item) => {
      res.status(REQUEST_CREATED).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const deletePost = (req, res, next) => {
  const { itemId } = req.params;

  Post.findById(itemId)
    .orFail()
    .then((item) => {
      return item.deleteOne().then(() => res.send({ message: "Deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

module.exports = { getPosts, createPost, deletePost };
