// index.js
const express = require('express');
const mongoose = require('mongoose');
const protect = require('./middleware/auth'); // Importujeme náš middleware pro ověření tokenu
const app = express();

app.use(express.json());  // Zpracování JSON dat

// Předpokládejme, že máš nějakou funkci pro připojení k databázi
mongoose.connect('mongodb://localhost:27017/mygame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Failed to connect to DB:', err));

// Definice routy
app.get('/api/test', protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

// Startování serveru
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});