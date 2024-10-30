import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth_routes.js';
import usersRoutes from './routes/users_routes.js';
import restaurantsRoutes from './routes/restaurants_routes.js';
import miscRoutes from './routes/misc_routes.js';
import dotenv from 'dotenv';
import path from 'path'; // Importer path

dotenv.config();  // Charger les variables d'environnement

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serveur de fichiers statiques
const __dirname = path.resolve(); // Obtenir le chemin absolu du répertoire courant
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/misc', miscRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  