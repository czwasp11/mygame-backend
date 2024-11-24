const jwt = require('jsonwebtoken');


  // Získání tokenu z hlavičky
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];  // Získání tokenu po "Bearer"

      // Ověření tokenu
      const decoded = jwt.verify(token, 'secretkey');

      // Uložení uživatele do požadavku pro další použití
      req.user = decoded.id;
      next();  // Pokračuj do dalšího middleware nebo route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token, not authorized' });
  }
;

module.exports = protect;

const protect = require('./middleware/auth');

app.get('/api/protected', protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});