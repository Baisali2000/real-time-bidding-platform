const Item = require('../models/Item');
const { uploadImage } = require('../utils/imageUpload');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req);
    const item = await Item.create({ ...req.body, image_url: imageUrl });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    const imageUrl = await uploadImage(req);
    await item.update({ ...req.body, image_url: imageUrl });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
