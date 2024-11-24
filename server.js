const express = require('express');  // Načteme Express
const mongoose = require('mongoose');  // Načteme Mongoose
const bodyParser = require('body-parser');  // Načteme Body-parser
const bcrypt = require('bcryptjs');  // Načteme bcrypt pro hashování hesel
const cors = require('cors');  // Načteme CORS middleware

const app = express();  // Vytvoříme nový server
const PORT = process.env.PORT || 5000;  // Určíme port

// Povolení CORS pro všechny požadavky
app.use(cors());

// Middleware pro práci s JSON daty
app.use(bodyParser.json());

// Připojení k MongoDB
mongoose.connect('mongodb://localhost:27017/thegame')
  .then(() => console.log("Připojeno k MongoDB"))
  .catch(err => console.log("Chyba při připojování k databázi:", err));

// Definice modelu uživatele
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}));

// Registrace uživatele
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Kontrola, jestli už uživatel existuje
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Uživatel s tímto jménem nebo e-mailem již existuje.' });
  }

  // Hashování hesla
  const hashedPassword = await bcrypt.hash(password, 10);

  // Vytvoření nového uživatele
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Uživatel úspěšně zaregistrován.' });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při registraci uživatele.' });
  }
});

// Přihlášení uživatele
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Najdeme uživatele podle přezdívky
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Uživatel neexistuje.' });
  }

  // Porovnáme heslo
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Špatné heslo.' });
  }

  res.status(200).json({ message: 'Přihlášení úspěšné.' });
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});