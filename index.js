// implement your API here
const express = require("express");

const DataBase = require("./data/db");
const server = express();

server.use(express.json());

//GET request

server.get("/api/users", (req, res) => {
  DataBase.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        message: "Cannot access users data"
      });
    });
});

//GET Users by id

server.get("/api/users/:id", (req, res) => {
  DataBase.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `The user doesn't exist with given ID` });
      }
    })
    .catch(() => {
      res.status(500).json({ message: `Server had issue sending the info` });
    });
});
const port = 3000;
server.listen(port, () => console.log(`API listening on port ${port}`));
