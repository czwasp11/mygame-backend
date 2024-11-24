// Načítáme potřebné moduly
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Nastavení middlewaru
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definice základní route (endpoint)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Spuštění serveru na specifikovaném portu
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/test', (req, res) => {
    res.send('Server is working!');
  });