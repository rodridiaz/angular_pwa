const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/users')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/users', (req, res, next) => {
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

app.put('/api/users/:id', (req, res, next) => {
  const user = new User({
    _id : req.body.id,
    name: req.body.name,
    email: req.body.email
  });
  User.updateOne({ _id: req.params.id }, user).then(result => {
    res.status(200).json({ message: 'Update successful!' })
  });
});

app.get('/api/users', (req, res, next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched succesfully!',
        users: documents
      });
    });
});

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  })
})

app.delete('/api/users/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'User deleted successfully' });
  })
})

module.exports = app;
