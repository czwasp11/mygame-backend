const express = require('express');
const mongoose = require('mongoose');
const protect = require('./middleware/auth'); // Import ochrany

const app = express();
app.use(express.json());

// Příklad chráněné routy
app.get('/api/protected', protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

// Připojení k databázi a spuštění serveru
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB připojeno'))
  .catch(err => console.log('Chyba při připojování k MongoDB:', err));

  module.exports = app;