require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models'); // adjust path if needed

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Backend is running'));

// Sync database and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // auto create/update tables
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });
