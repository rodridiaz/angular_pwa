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
    "GET, POST, PATCH, DELETE, OPTIONS"
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
})

app.get('/api/users', (req, res, next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched succesfully!',
        users: documents
      });
    });
});

app.delete('/api/users/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'User deleted successfully' });
  })
})

module.exports = app;
