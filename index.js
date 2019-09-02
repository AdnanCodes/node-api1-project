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
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//Delete user by id

server.delete("/api/users/:id", (req, res) => {
  DataBase.remove(req.params.id)
    .then(records => {
      if (records > 0) {
        res.status(200).json({ message: "The user has been deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The user with that ID doesn't exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server had an error trying to delete" });
    });
});

//Post user

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (name || bio) {
    DataBase.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res,
          status(500).json({ error: "Error in creating an user in database" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  }
});

//Update user

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;

  if (name || bio) {
    DataBase.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({ message: "The user doesn't exist with that ID" });
        }
      })
      .catch(() => {
        res.status(500).json({ error: "The user couldn't be updated" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }
});

const port = 3000;
server.listen(port, () => console.log(`API listening on port ${port}`));
