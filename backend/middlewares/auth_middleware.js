// /middlewares/auth_middleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupère le token après "Bearer "

  if (!token) return res.sendStatus(401); // Pas de token fourni

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide

    // Stocke l'ID utilisateur dans la requête pour l'utiliser dans les routes suivantes

    req.jwtUserId = user.userId;
    req.jwtUserEmail = user.email;
    next();
  });
};


export default authMiddleware;
