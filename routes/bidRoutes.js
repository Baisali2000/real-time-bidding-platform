const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/items/:itemId/bids', bidController.getAllBids);
router.post('/items/:itemId/bids', authenticate, bidController.placeBid);

module.exports = router;