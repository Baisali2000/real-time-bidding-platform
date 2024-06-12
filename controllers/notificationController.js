const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.findByUserId(req.user.id);
  res.status(200).json(notifications);
};

exports.markRead = async (req, res) => {
  await Notification.markAsRead(req.body.id);
  res.status(200).json({ message: 'Notification marked as read' });
};