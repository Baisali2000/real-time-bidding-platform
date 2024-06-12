const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, notificationController.getNotifications);
router.post('/mark-read', authenticate, notificationController.markRead);

module.exports = router;