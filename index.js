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

const port = 3000;
server.listen(port, () => console.log(`API listening on port ${port}`));
