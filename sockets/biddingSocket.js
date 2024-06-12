const Bid = require('../models/Bid');
const Item = require('../models/Item');
const Notification = require('../models/Notification');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('placeBid', async (data) => {
      const { itemId, bid_amount, user_id } = data;
      const item = await Item.findById(itemId);
      if (bid_amount > item.current_price) {
        await Bid.create({ item_id: itemId, user_id, bid_amount });
        await Item.updateById(itemId, { current_price: bid_amount });
        await Notification.create({
          user_id: item.user_id,
          message: `Your item ${item.name} has a new bid of ${bid_amount}`,
          is_read: false
        });
        io.emit('update', { itemId, bid_amount });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};