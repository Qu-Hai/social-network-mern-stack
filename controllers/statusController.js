const Status = require('./../models/statusModel');
const catchAsync = require('./../util/catchAsync');
const multer = require('multer');
const User = require('./../models/userModel');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
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
exports.uploadFile = upload.single('image');
exports.createStatus = catchAsync(async (req, res, next) => {
  const newStatus = await Status.create({
    image: req.file.filename,
    author: req.body.author,
    text: req.body.text,
  });
  User.findByIdAndUpdate(req.body.author, {
    $push: { status: newStatus._id },
  }).exec();
  console.log(req.file);
  res.status(201).json({
    status: 'success',
    data: {
      status: newStatus,
    },
  });
});
exports.getAllStatus = catchAsync(async (req, res, next) => {
  statuss = await Status.find()
    .sort({ create: -1 })
    .populate({ path: 'author' });
  res.json(statuss);
});

exports.likeStatus = catchAsync(async (req, res, next) => {
  const upLike = await Status.findByIdAndUpdate(req.params.id, {
    $inc: { like: 1 },
    $push: { likePerson: req.body.likePerson },
  }).exec();
  console.log('upLike');
  console.log(req.body);
  res.status(201).json({
    status: 'success',
    upLike,
  });
});
exports.unLikeStatus = catchAsync(async (req, res, next) => {
  const downLike = await Status.findByIdAndUpdate(req.params.id, {
    $inc: { like: -1 },
    $pull: { likePerson: req.body.likePerson },
  }).exec();
  console.log('unLike');
  console.log(req.body);

  res.status(201).json({
    status: 'success',
    downLike,
  });
});
