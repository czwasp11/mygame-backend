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
mongoose.connect('YOUR_MONGO_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((error) => console.log(error));