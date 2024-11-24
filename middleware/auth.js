const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Získání tokenu z hlavičky
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }

  try {
    // Ověření tokenu
    const decoded = jwt.verify(token, 'secretkey'); // Nahraď 'secretkey' skutečným tajným klíčem

    // Uložení uživatele do požadavku pro další použití
    req.user = decoded.id;
    next();  // Pokračuj do dalšího middleware nebo route
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = protect;