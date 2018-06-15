const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With, Content-Type', 'Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

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
