const mongoose = require('mongoose');

// Definice modelu pro uživatele
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const bcrypt = require('bcryptjs');

// Před uložením uživatele šifrujeme heslo
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Pokud heslo nebylo změněno, pokračuj dál

  // Generování salt pro bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Metoda pro porovnání hesla při přihlášení
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};