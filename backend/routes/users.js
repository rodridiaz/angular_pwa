const express = require('express');
const multer = require('multer');

const User = require('../models/user');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    imagepath: url + "/images/" + req.file.filename
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
