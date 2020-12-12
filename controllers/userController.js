const User = require('./../models/userModel');
const catchAsync = require('./../util/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../util/AppError');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, Date.now() + file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});
exports.uploadFile = upload.single('avatar');
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log('cookie...', req.headers.cookie.jwt);
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id).populate({
    path: 'status',
  });
  res.status(200).json({
    status: 'success',
    currentUser,
  });
});
exports.getName = catchAsync(async (req, res, next) => {
  // 3) Check if user still exists
  const userName = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: userName,
  });
});
exports.createUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'getAllUsers',
  });
  req.session.name = name;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  const Id = req.body.id;
  const updatedUser = await User.findByIdAndUpdate(Id, {
    avatar: req.file.filename,
    location: req.body.location,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUsers = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'getAllUsers',
  });
};
