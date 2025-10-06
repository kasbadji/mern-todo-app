//This middleware will:
//Check if the request contains a valid JWT token in the Authorization header.
//If valid → decode it and attach the user info (req.user = decoded).
//If invalid or missing → block access (return 401 Unauthorized).

//Le rôle du middleware auth.js:
//Le middleware est un filtre placé avant tes contrôleurs.

//Chaque requête passe dedans :
//Il regarde dans les headers si un Authorization: Bearer <token> est présent.
//Il vérifie ce token avec jwt.verify(...) et ta clé secrète (JWT_SECRET).
//Si le token est valide → il décode l’info (ici l’id de l’utilisateur) et la met dans req.user.
//Par exemple : req.user = { id: "68d277505c34e7661fef4e7f" }
//Si pas de token ou token invalide → il bloque la requête avec une erreur 401 Unauthorized.

//Ça veut dire que seul un utilisateur connecté peut appeler les routes protégées.

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }
};
