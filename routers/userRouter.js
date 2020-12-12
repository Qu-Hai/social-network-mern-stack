const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authControler');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot', authController.forgotPassword);
router.patch('/reset/:token', authController.resetPassword);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router.route('/profile').post(userController.getUser);
router
  .route('/update')
  .post(userController.uploadFile, userController.updateMe)
  .delete(userController.deleteUsers);
router.route('/chat/:id').get(userController.getName);
module.exports = router;
