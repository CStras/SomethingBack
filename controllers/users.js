const User = require("../models/users");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      throw Error("This is an error");
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: err.message || "An error occurred while fetching users.",
      });
    });
};

module.exports = { getUsers };
