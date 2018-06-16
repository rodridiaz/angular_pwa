const User = require('../models/user');

exports.createUser = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    imagePath: url + "/images/" + req.file.filename
  });
  user.save().then(createdUser => {
    res.status(201).json({
      message: 'User added successfully',
      user: {
        ...createdUser,
        id: createdUser._id,
      }
    });
  });
  console.log(user);
}

exports.updateUser = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const user = new User({
    _id : req.body.id,
    name: req.body.name,
    email: req.body.email,
    imagePath: imagePath
  });
  console.log(user);
  User.updateOne({ _id: req.params.id }, user).then(result => {
    res.status(200).json({ message: 'Update successful!' })
  });
}

exports.deteteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'User deleted successfully' });
  })
}

exports.getUsers = (req, res, next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched succesfully!',
        users: documents
      });
    });
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  })
}
