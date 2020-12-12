const express = require('express');
const statusController = require('./../controllers/statusController');
const authController = require('./../controllers/authControler');
const router = express.Router();
router
  .route('/')
  .get(statusController.getAllStatus)
  .post(
    authController.protect,
    statusController.uploadFile,
    statusController.createStatus
  );
router.route('/like/:id').patch(statusController.likeStatus);
router.route('/unlike/:id').patch(statusController.unLikeStatus);
module.exports = router;
