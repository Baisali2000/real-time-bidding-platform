const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middlewares/errorHandler');
const socketIo = require('socket.io');

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});

const io = socketIo(server);
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('bid', (data) => {
    io.emit('update', data);
  });
});
module.exports = app;
//export default app;