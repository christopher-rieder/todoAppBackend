const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');

router.route('/')
  .get(getAllTodos)
  .post(addTodo);

router.route('/:id')
  .get(getTodosById)
  .patch(updateTodo);

function getAllTodos (req, res) {
  Note.find({}, (error, result) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json(result);
  });
}

function getTodosById (req, res) {
  Note.findById(req.params.id, (error, result) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json(result);
  });
}

function addTodo (req, res) {
  Note.create(req.body)
    .then(data => {
      res.status(201).json({ id: 1 });
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(error);
    });
}

function updateTodo (req, res) {
  Note.findByIdAndUpdate(req.params.id, req.body, (error, result) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json(result);
  });
}

module.exports = router;
