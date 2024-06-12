const Bid = require('../models/Bid');
const Item = require('../models/Item');
const Notification = require('../models/Notification');

exports.getAllBids = async (req, res) => {
  const bids = await Bid.findByItemId(req.params.itemId);
  res.status(200).json(bids);
};

exports.placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (bid_amount <= item.current_price) {
    return res.status(400).json({ error: 'Bid amount must be higher than the current price' });
  }
  const bid = {
    item_id: itemId,
    user_id: req.user.id,
    bid_amount
  };
  await Bid.create(bid);
  await Item.updateById(itemId, { current_price: bid_amount });
  await Notification.create({
    user_id: item.user_id,
    message: `Your item ${item.name} has a new bid of ${bid_amount}`,
    is_read: false
  });
  res.status(201).json({ message: 'Bid placed' });
};