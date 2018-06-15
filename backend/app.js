const express = require('express');

const app = express();

app.use('/api/users', (req, res, next) => {
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
