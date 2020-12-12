const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Status = require('./statusModel');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nhập họ tên'],
  },
  email: {
    type: String,
    required: [true, 'Nhập email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email không đúng'],
  },
  password: {
    type: String,
    required: [true, 'Nhập mật khẩu'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Nhập lại mật khẩu'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: 'Không trùng khớp!',
  },
  avatar: {
    type: String,
    default: '/no-img.png',
  },
  location: {
    type: String,
    default: 'Location',
  },
  status: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Status',
    },
  ],
  like: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Status',
    },
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now();
  return next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log(resetToken, this.passwordResetToken);
  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
