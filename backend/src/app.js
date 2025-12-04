const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config();


const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const storesRoutes = require('./routes/stores.routes');
const ownerRoutes = require('./routes/owner.routes');


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/stores', storesRoutes);
app.use('/api/v1/owner', ownerRoutes);


app.get('/', (req, res) => res.json({ ok: true }));


app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});


module.exports = app;