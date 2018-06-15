const express = require('express');
const bodyParser = require("body-parser");

const User = require('./models/user');

const app = express();

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
  console.log(user);
  res.status(201).json({
    message: 'User added successfully'
  });
})

app.get('/api/users', (req, res, next) => {
  const users = [
    {
      id: 'sad213asd324',
      name: 'test name',
      email: 'asdsad@asdsadf.com'
    },
    {
      id: 'sdfsdf687s6d',
      name: 'test name 2',
      email: 'asdsad@asdsadf.com'
    }
  ];
  res.status(200).json({
    message: 'Users fetched succesfully!',
    users: users
  });
});

module.exports = app;
