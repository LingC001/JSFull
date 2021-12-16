const db = require("../models");
const Records = db.Records;

// Create and Save a new records
exports.create = (req, res) => {
  // Validate request
  if (!req.body.calValue) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
    console.log("req",req.body.calValue)
  // Create a records
  const records = new Records({
    calValue: req.body.calValue
  });

  // Save records in the database
  records
    .save(records)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the records."
      });
    });
};

// Retrieve all recordss from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  records.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recordss."
      });
    });
};

// Find a single records with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  records.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found records with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving records with id=" + id });
    });
};

// Update a records by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  records.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update records with id=${id}. Maybe records was not found!`
        });
      } else res.send({ message: "records was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating records with id=" + id
      });
    });
};

// Delete a records with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  records.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete records with id=${id}. Maybe records was not found!`
        });
      } else {
        res.send({
          message: "records was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete records with id=" + id
      });
    });
};

// Delete all recordss from the database.
exports.deleteAll = (req, res) => {
  records.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} recordss were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recordss."
      });
    });
};

// Find all published recordss
exports.findAllPublished = (req, res) => {
  records.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recordss."
      });
    });
};
