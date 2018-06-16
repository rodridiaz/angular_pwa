const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('', (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  user.save().then(createdUser => {
    res.status(201).json({
      message: 'User added successfully',
      userId: createdUser._id
    });
  });
  console.log(user);
});

router.put('/:id', (req, res, next) => {
  const user = new User({
    _id : req.body.id,
    name: req.body.name,
    email: req.body.email
  });
  User.updateOne({ _id: req.params.id }, user).then(result => {
    res.status(200).json({ message: 'Update successful!' })
  });
});

router.get('', (req, res, next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched succesfully!',
        users: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  })
});

router.delete('/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'User deleted successfully' });
  })
});

module.exports = router;
