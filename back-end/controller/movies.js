const express = require("express");
const cors = require("cors");
const Movies = require("../models/movie");
// config
const router = express.Router();
// middle-ware
router.use(express.json());
router.use(cors());

// post data
router.post("/", (req, res) => {
  Movies.create(req.body, (err, createdMovie) => {
    res.json(createdMovie);
  });
});

// get data
router.get("/", (req, res) => {
  Movies.find({}, (err, foundMovie) => {
    res.json(foundMovie);
  });
});

// delete data
router.delete("/:id", (req, res) => {
  Movies.findByIdAndRemove(
    req.params.id,
    { new: true },
    (err, deletedMovie) => {
      res.json(deletedMovie);
    }
  );
});

// update data
router.put("/:id", (req, res) => {
  Movies.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedMovie) => {
      res.json(updatedMovie);
    }
  );
});

// export to server
module.exports = router;
